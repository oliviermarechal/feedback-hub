<script lang="ts">
    import Header from '../header.svelte';
    import {Button} from '$lib/components/ui/button';
    import {RadioGroup, RadioGroupItem} from '$lib/components/ui/radio-group';
    import {Label} from '$lib/components/ui/label';
    import { cn } from "$lib/utils";

    export const frequencies: { id: string, value: string, label: string; priceSuffix: string }[] = [
        {id: '1', value: '1', label: 'Monthly', priceSuffix: '/month'},
        {id: '2', value: '2', label: 'Annually', priceSuffix: '/year'},
    ];

    export const tiers: any[] = [
        {
            name: 'Free',
            id: '0',
            href: '/auth/registration',
            price: {'1': '$0', '2': '$0'},
            discountPrice: {'1': '', '2': ''},
            description: `Large free version, no credit card required.`,
            features: [
                `Collect feedback and upvote in-app`,
                `Full dashboard access`,
                `Limited to 3 projects`,
            ],
            featured: false,
            highlighted: false,
            soldOut: false,
            cta: `Get started`,
        },
        {
            name: 'Premium',
            id: '1',
            href: '/auth/registration',
            price: {'1': '$24', '2': '$200'},
            discountPrice: {'1': '0', '2': '0'},
            description: `When you grow, need more power and flexibility.`,
            features: [
                `All in the free plan plus`,
                `Deduplication of feedback`,
                `Custom forms`,
                `White labelling`,
                `Unlimited projects`,
            ],
            featured: false,
            highlighted: true,
            soldOut: true,
            cta: `Get started`,
        },
    ];

    let frequency: { id: string, value: string, label: string; priceSuffix: string } = frequencies[0];
</script>

<style>
    .frequencies {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
</style>

<Header/>
<div class='flex flex-col w-full items-center'>
    <div class="w-full flex flex-col items-center">
        <div class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
            <div class="w-full lg:w-auto mx-auto max-w-4xl lg:text-center">
                <h1 class="text-black dark:text-white text-4xl font-semibold max-w-xs sm:max-w-none md:text-6xl !leading-tight">
                    Pricing
                </h1>

            </div>

            <div class="w-full lg:w-auto flex justify-center my-4">
                <p class="w-full px-4 py-3 text-xs bg-slate-100 text-black dark:bg-slate-300/30 dark:text-white/80 rounded-xl">
                    Insight Hunt is in beta version. Premium version is not allowed at the moment. Feel free to try Insight Hunt and give us feedback.
                </p>
            </div>

            <div class="w-full mt-16 flex justify-center">
                <RadioGroup
                    orientation="horizontal"
                    value={frequency.value}
                    onValueChange={(value) => {
                        const selected = frequencies.find((f) => f.value === value);
                        if (selected) {
                            frequency = selected;
                        }
                    }}
                    class="gap-2 grid gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200/100 dark:ring-gray-800"
                    style={`grid-template-columns: repeat(${frequencies.length}, minmax(0, 1fr));`}
                >
                    <Label class="sr-only">Payment frequency</Label>
                    {#each frequencies as option}
                        <Label
                                class={
                                frequency.value === option.value
                                    ? 'bg-slate-500/90 text-white dark:bg-slate-900/70 dark:text-white/70 cursor-pointer rounded-full px-2.5 py-2 transition-all'
                                    : 'bg-transparent text-gray-500 hover:bg-slate-500/10 cursor-pointer rounded-full px-2.5 py-2 transition-all'}
                        >
                            {option.label}
                            <RadioGroupItem
                                    value={option.value}
                                    id={option.value}
                                    class="hidden"
                            />
                        </Label>
                    {/each}
                </RadioGroup>
            </div>

            <div
                    class={cn(
              'isolate mx-auto mt-4 mb-28 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none',
              tiers.length === 2 ? 'lg:grid-cols-2' : '',
              tiers.length === 3 ? 'lg:grid-cols-3' : '',
            )}
            >
                {#each tiers as tier}
                    <div
                        class={cn(
                        tier.featured
                            ? '!bg-gray-900 ring-gray-900 dark:!bg-gray-100 dark:ring-gray-100'
                            : 'bg-white dark:bg-gray-900/80 ring-gray-300/70 dark:ring-gray-700',
                        'max-w-xs ring-1 rounded-3xl p-8 xl:p-10'
                        )}
                    >
                        <h3
                                id={tier.id}
                                class={cn(
                                tier.featured ? 'text-white dark:text-black' : 'text-black dark:text-white',
                                'text-2xl font-bold tracking-tight',
                            )}
                        >
                            {tier.name}
                        </h3>
                        <p
                                class={cn(
                                tier.featured
                                    ? 'text-gray-300 dark:text-gray-500'
                                    : 'text-gray-600 dark:text-gray-400',
                                'mt-4 text-sm leading-6',
                            )}
                        >
                            {tier.description}
                        </p>
                        <p class="mt-6 flex items-baseline gap-x-1">
                  <span
                          class={cn(
                          tier.featured ? 'text-white dark:text-black' : 'text-black dark:text-white',
                          'text-4xl font-bold tracking-tight',
                          tier.discountPrice && tier.discountPrice[frequency.value]
                              ? 'line-through'
                              : '',
                      )}
                  >
                    {typeof tier.price === 'string'
                        ? tier.price
                        : tier.price[frequency.value]}
                  </span>

                            <span
                                    class={cn(
                                    tier.featured ? 'text-white dark:text-black' : 'text-black dark:text-white',
                                )}
                            >
                    {typeof tier.discountPrice === 'string'
                        ? tier.discountPrice
                        : tier.discountPrice[frequency.value]}
                  </span>
                        {#if typeof tier.price !== 'string'}
                            <span
                                class={cn(
                                    tier.featured
                                        ? 'text-gray-300 dark:text-gray-500'
                                        : 'dark:text-gray-400 text-gray-600',
                                    'text-sm font-semibold leading-6',
                                )}
                            >
                              {frequency.priceSuffix}
                            </span>
                        {/if}
                        </p>
                        <a
                                href={tier.href}
                                aria-describedby={tier.id}
                                class={cn(
                                'flex mt-6 shadow-sm',
                                tier.soldOut ? 'pointer-events-none' : '',
                            )}
                        >
                            <Button
                                    size="lg"
                                    disabled={tier.soldOut}
                                    class={cn(
                                    'w-full',
                                    !tier.highlighted && !tier.featured
                                        ? 'bg-gray-100 dark:bg-gray-600'
                                        : 'bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-700',
                                    tier.featured || tier.soldOut ? 'bg-white dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-black' : 'hover:opacity-80 transition-opacity',
                                )}
                                    variant='outline'
                            >
                                {tier.soldOut ? 'Soon' : tier.cta}
                            </Button>
                        </a>

                        <ul
                                class={cn(
                                tier.featured
                                    ? 'text-gray-300 dark:text-gray-500'
                                    : 'text-gray-700 dark:text-gray-400',
                                'mt-8 space-y-3 text-sm leading-6 xl:mt-10',
                            )}
                        >
                            {#each tier.features as feature}
                                <li class="flex gap-x-3">
                                    <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            class='w-6 h-6'
                                    >
                                        <path
                                                fillRule="evenodd"
                                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                                clipRule="evenodd"
                                        />
                                    </svg>
                                    {feature}
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>