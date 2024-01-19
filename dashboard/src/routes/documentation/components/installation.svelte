<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs";
    import {typescript} from 'svelte-highlight/languages';
    import {Highlight} from 'svelte-highlight';
    import {getDefaultScriptInstall} from './default-script-install';

    $: code = getDefaultScriptInstall();
</script>

<Tabs.Root value="node">
    <Tabs.List>
        <Tabs.Trigger value="node">Node.js</Tabs.Trigger>
        <Tabs.Trigger value="vanilla">JS vanilla</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="node">
        <Highlight language={typescript} code={`npm install -s insight-hunt
OR
yarn add insight-hunt`} />
    </Tabs.Content>
    <Tabs.Content value="vanilla">
        <Highlight language={typescript} {code} />
    </Tabs.Content>
</Tabs.Root>