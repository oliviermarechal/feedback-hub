<script lang="ts">
    import type {Feedback} from '../../stores/interfaces/feedback';
    import EditFeedback from '../../component/feedback/edit-feedback.svelte';
    import * as Card from '$lib/components/ui/card';
    import Icon from '@iconify/svelte';
    import {Button} from '$lib/components/ui/button';
    import {Badge} from '$lib/components/ui/badge';
    import * as Table from '$lib/components/ui/table';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import {filter, removeFeedback} from '../../stores/feedback.store';
    import {CalendarDate, getLocalTimeZone} from '@internationalized/date';
    import FeedbackPanelToolbar from './feedback-panel-toolbar.svelte';
    import apiClient from '../../api';

    export let feedbacks: Feedback[];
    const displayPartialContent = (content: string) => {
        if (content.length > 60) {
            return `${content.slice(0, 60)}...`;
        }

        return content;
    }

    const handleDeleteFeedback = async (id: string) => {
        const feedbackResult = await apiClient.delete(`feedback/${id}`);
        if (feedbackResult.status !== 204) {
            // TODO Manage error
            throw new Error(feedbackResult.data.message);
        }
        removeFeedback(id);
    }

    let feedback: Feedback | undefined;

    $: openFeedbackModal = (feedbackId: string) => {
        feedback = feedbacks.find(f => f.id === feedbackId);
    }

    $: getCountTotalVote = () => {
        if (feedbacks?.length > 0) {
            return feedbacks.map(a => a.vote).reduce((a, b) => a + b)
        } else {
            return 0;
        }
    }

    $: filterFeedback = () => {
        let filteredFeedbacks = feedbacks;
        if ($filter.text?.length > 2) {
            filteredFeedbacks = filteredFeedbacks.filter(f => f.content.search(new RegExp($filter.text, 'i')) !== -1)
        }

        if ($filter.rangeDate.start && $filter.rangeDate.end) {
            filteredFeedbacks = filteredFeedbacks.filter((f) =>
                f.createdAt.getTime() > ($filter.rangeDate.start as CalendarDate).toDate(getLocalTimeZone()).getTime() &&
                f.createdAt.getTime() < ($filter.rangeDate.end as CalendarDate).toDate(getLocalTimeZone()).getTime()
            )
        }

        return filteredFeedbacks;
    }
</script>

<div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
    <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <Card.Title class="text-sm font-medium">feedback to upvote</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="text-2xl font-bold">{feedbacks.length}</div>
        </Card.Content>
    </Card.Root>
    <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <Card.Title class="text-sm font-medium">Total vote</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="text-2xl font-bold">{getCountTotalVote()}</div>
        </Card.Content>
    </Card.Root>
    <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <Card.Title class="text-sm font-medium"><i>Comming soon</i></Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="text-2xl font-bold">...</div>
        </Card.Content>
    </Card.Root>
</div>
<div class="space-y-4 mt-4">
    <FeedbackPanelToolbar fromVoting={true} />
    <div class="rounded-md border">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Date</Table.Head>
                    <Table.Head>From</Table.Head>
                    <Table.Head>Content</Table.Head>
                    <Table.Head>Vote</Table.Head>
                    <Table.Head>tags</Table.Head>
                    <Table.Head></Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#if filterFeedback().length === 0}
                    <Table.Row>
                        <td>No feedbacks</td>
                    </Table.Row>
                {:else}
                    {#each filterFeedback() as feedback, i (feedback.id)}
                        <Table.Row>
                            <Table.Cell>{feedback.createdAt.toLocaleDateString()}</Table.Cell>
                            <Table.Cell>{#if feedback.author && feedback.author.email } {feedback.author.email} {:else} guest {/if}</Table.Cell>
                            <Table.Cell>{displayPartialContent(feedback.content)}</Table.Cell>
                            <Table.Cell>{feedback.vote}</Table.Cell>
                            <Table.Cell class="space-y-1 space-x-1">
                                {#if feedback.tags && feedback.tags.length > 0}
                                    {#each feedback.tags as tag, i (tag.id)}
                                        <Badge>{tag.label}</Badge>
                                    {/each}
                                {/if}
                            </Table.Cell>
                            <Table.Cell>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger asChild let:builder>
                                        <Button
                                                variant="ghost"
                                                builders={[builder]}
                                                class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                                            <Icon icon="pepicons-pencil:dots-y" width="24" height="24" />
                                            <span class="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content class="w-[160px]" align="end">
                                        <DropdownMenu.Item on:click={() => openFeedbackModal(feedback.id)}>Edit</DropdownMenu.Item>
                                        <DropdownMenu.Item class="text-red-600" on:click={() => handleDeleteFeedback(feedback.id)}>
                                            Delete
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                {/if}
            </Table.Body>
        </Table.Root>
    </div>
</div>

{#if feedback}
    <EditFeedback feedback={feedback} open={!!feedback} onClose={() => feedback = undefined} />
{/if}