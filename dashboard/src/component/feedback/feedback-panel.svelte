<script lang="ts">
    import type {Feedback} from '../../stores/interfaces/feedback';
    import {FeedbackStatus, FeedbackType, humanizeType} from '../../stores/interfaces/feedback';
    import EditFeedback from '../../component/feedback/edit-feedback.svelte';
    import FeedbackPanelToolbar from './feedback-panel-toolbar.svelte';
    import apiClient from '../../api';
    import {newFeedbacks, votingFeedbacks} from '../../stores/feedback.store';
    import Icon from '@iconify/svelte';
    import { Badge } from '$lib/components/ui/badge';
    import { Button } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
    import * as Table from '$lib/components/ui/table';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import * as Pagination from "$lib/components/ui/pagination";
    import {onMount} from 'svelte';
    import { page } from '$app/stores';
    import {listNewFeedback, listVotingFeedback} from '$lib/actions/feedback/get-list-feedback.action';

    const id = $page.params.id;

    let limit: number = 10;
    let offset: number = 0;

    onMount(() => {
        listNewFeedback(id, limit, offset)
    });

    const handlePaginate = (page: number) => {
        offset = page - 1;
        listNewFeedback(id, limit, offset)
    }

    const displayPartialContent = (content: string) => {
        if (content.length > 60) {
            return `${content.slice(0, 60)}...`;
        }

        return content;
    }

    let feedback: Feedback | undefined;
    $: openFeedbackModal = (feedbackId: string) => {
        feedback = $newFeedbacks.feedbacks.find(f => f.id === feedbackId);
    }

    $: getCountDailyFeedback = () => {
        if ($newFeedbacks.feedbacks?.length > 0) {
            let todayAtMidnight = new Date();
            todayAtMidnight.setHours(0, 0, 0, 0);
            return $newFeedbacks.feedbacks.filter((f) => f.createdAt.getTime() > todayAtMidnight.getTime()).length;
        } else {
            return 0;
        }
    }

    $: getBugTypePercent = () => {
        if ($newFeedbacks.feedbacks?.length > 0) {
            const total = $newFeedbacks.feedbacks.length;
            const bugs = $newFeedbacks.feedbacks.filter((f) => f.type === FeedbackType.Bug).length;
            return Math.round((bugs / total) * 100);
        } else {
            return 0;
        }
    }

    const handleDeleteFeedback = async (feedbackId: string) => {
        const feedbackResult = await apiClient.delete(`feedback/${feedbackId}`);
        if (feedbackResult.status !== 204) {
            // TODO Manage error
            throw new Error(feedbackResult.data.message);
        }
        listNewFeedback(id, $newFeedbacks.limit, $newFeedbacks.offset);
    }

    const toUpvote = async (event: any, feedback: Feedback) => {
        event.stopPropagation();

        const feedbackResult = await apiClient.post(`feedback/${feedback.id}/to-upvote`);
        if (feedbackResult.status !== 200) {
            // TODO Manage error
            throw new Error(feedbackResult.data.message);
        }
        feedback.status = FeedbackStatus.Voting;

        await Promise.all([
            listNewFeedback(id, $newFeedbacks.limit, $newFeedbacks.offset),
            listVotingFeedback(id, $votingFeedbacks.limit, $votingFeedbacks.offset),
        ]);
    }
</script>

<div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
    <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <Card.Title class="text-sm font-medium">new feedbacks</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="text-2xl font-bold">{$newFeedbacks.feedbacks?.length}</div>
            <p class="text-xs text-muted-foreground">
                +180.1% from last month
            </p>
        </Card.Content>
    </Card.Root>
    <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <Card.Title class="text-sm font-medium">Feedbacks today</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="text-2xl font-bold">{getCountDailyFeedback()}</div>
        </Card.Content>
    </Card.Root>
    <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <Card.Title class="text-sm font-medium">Percent are bugs</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="text-2xl font-bold">{getBugTypePercent()} %</div>
        </Card.Content>
    </Card.Root>
</div>
<div class="space-y-4 mt-6">
    <FeedbackPanelToolbar />
    <div class="rounded-md border">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Date</Table.Head>
                    <Table.Head>From</Table.Head>
                    <Table.Head>Type</Table.Head>
                    <Table.Head>Content</Table.Head>
                    <Table.Head>tags</Table.Head>
                    <Table.Head></Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#if $newFeedbacks.feedbacks.length === 0}
                    <Table.Row>
                        <td>No feedbacks</td>
                    </Table.Row>
                {:else}
                    {#each $newFeedbacks.feedbacks as feedback, i (feedback.id)}
                        <Table.Row>
                            <Table.Cell>{feedback.createdAt.toLocaleDateString()}</Table.Cell>
                            <Table.Cell>{#if feedback.author && feedback.author.email } {feedback.author.email} {:else} Guest {/if}</Table.Cell>
                            <Table.Cell>{humanizeType(feedback.type)}</Table.Cell>
                            <Table.Cell>{displayPartialContent(feedback.content)}</Table.Cell>
                            <Table.Cell>
                                {#if feedback.tags && feedback.tags.length > 0}
                                    {#each feedback.tags as tag, i (tag.id)}
                                        <Badge class="mr-1">{tag.label}</Badge>
                                    {/each}
                                {/if}
                            </Table.Cell>
                            <Table.Cell>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger asChild let:builder>
                                        <Button
                                                variant="ghost"
                                                builders={[builder]}
                                                class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                                        >
                                            <Icon icon="pepicons-pencil:dots-y" width="24" height="24" />

                                            <span class="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content class="w-[160px]" align="end">
                                        {#if feedback.type === FeedbackType.Enhance}
                                            <DropdownMenu.Item on:click={(e) => toUpvote(e, feedback)}>Send to upvote</DropdownMenu.Item>
                                            <DropdownMenu.Item on:click={() => openFeedbackModal(feedback.id)}>Edit</DropdownMenu.Item>
                                        {:else}
                                            <DropdownMenu.Item on:click={() => openFeedbackModal(feedback.id)}>Show details</DropdownMenu.Item>
                                        {/if}
                                        <DropdownMenu.Separator />
                                        <DropdownMenu.Item class="text-red-600" on:click={() => handleDeleteFeedback(feedback.id)}>Delete</DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                {/if}
            </Table.Body>
        </Table.Root>
    </div>

    <Pagination.Root count={$newFeedbacks.total} perPage={limit} page={offset + 1} onPageChange={(page) => handlePaginate(page)} let:pages let:currentPage>
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