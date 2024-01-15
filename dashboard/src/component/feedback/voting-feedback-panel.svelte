<script lang="ts">
    import type {Feedback} from '../../stores/interfaces/feedback';
    import EditFeedback from '../../component/feedback/edit-feedback.svelte';
    import Icon from '@iconify/svelte';
    import {Button} from '$lib/components/ui/button';
    import {Badge} from '$lib/components/ui/badge';
    import * as Card from '$lib/components/ui/card';
    import * as Table from '$lib/components/ui/table';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import * as Pagination from "$lib/components/ui/pagination";
    import {filter, votingFeedbacks} from '../../stores/feedback.store';
    import {CalendarDate, getLocalTimeZone} from '@internationalized/date';
    import FeedbackPanelToolbar from './feedback-panel-toolbar.svelte';
    import apiClient from '../../api';
    import {onMount} from 'svelte';
    import {listVotingFeedback} from '$lib/actions/feedback/get-list-feedback.action';
    import { page } from '$app/stores';

    const id = $page.params.id;
    const displayPartialContent = (content: string) => {
        if (content.length > 60) {
            return `${content.slice(0, 60)}...`;
        }

        return content;
    }

    const handleDeleteFeedback = async (feedbackId: string) => {
        const feedbackResult = await apiClient.delete(`feedback/${feedbackId}`);
        if (feedbackResult.status !== 204) {
            // TODO Manage error
            throw new Error(feedbackResult.data.message);
        }
        listVotingFeedback(id, limit, offset);
    }

    let feedback: Feedback | undefined;

    let limit = 10;
    let offset = 0;
    onMount(() => {
        listVotingFeedback(id, limit, offset)
    });

    const handlePaginate = (page: number) => {
        offset = page - 1;
        listVotingFeedback(id, limit, offset)
    }

    $: openFeedbackModal = (feedbackId: string) => {
        feedback = $votingFeedbacks.feedbacks.find(f => f.id === feedbackId);
    }

    $: getCountTotalVote = () => {
        if ($votingFeedbacks.feedbacks?.length > 0) {
            return $votingFeedbacks.feedbacks.map(a => a.vote).reduce((a, b) => a + b)
        } else {
            return 0;
        }
    }
</script>

<div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
    <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <Card.Title class="text-sm font-medium">feedback to upvote</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="text-2xl font-bold">{$votingFeedbacks.feedbacks.length}</div>
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
                {#if $votingFeedbacks.feedbacks.length === 0}
                    <Table.Row>
                        <td>No feedbacks</td>
                    </Table.Row>
                {:else}
                    {#each $votingFeedbacks.feedbacks as feedback, i (feedback.id)}
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
    <Pagination.Root count={$votingFeedbacks.total} perPage={limit} page={offset + 1} onPageChange={(page) => handlePaginate(page)} let:pages let:currentPage>
        <Pagination.Content>
            <Pagination.Item>
                <Pagination.PrevButton>
                    <Icon icon="material-symbols:chevron-left" class="h-4 w-4" />
                    <span class="hidden sm:block">Previous</span>
                </Pagination.PrevButton>
            </Pagination.Item>
            {#each pages as page (page.key)}
                {#if page.type === "ellipsis"}
                    <Pagination.Item>
                        <Pagination.Ellipsis />
                    </Pagination.Item>
                {:else}
                    <Pagination.Item>
                        <Pagination.Link {page} isActive={currentPage === page.value}>
                            {page.value}
                        </Pagination.Link>
                    </Pagination.Item>
                {/if}
            {/each}
            <Pagination.Item>
                <Pagination.NextButton>
                    <span class="hidden sm:block">Next</span>
                    <Icon icon="material-symbols:chevron-right" class="h-4 w-4" />
                </Pagination.NextButton>
            </Pagination.Item>
        </Pagination.Content>
    </Pagination.Root>
</div>

{#if feedback}
    <EditFeedback feedback={feedback} open={!!feedback} onClose={() => feedback = undefined} />
{/if}