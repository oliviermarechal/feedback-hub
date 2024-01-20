<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs";
    import {typescript} from 'svelte-highlight/languages';
    import {Highlight} from 'svelte-highlight';
</script>

<Tabs.Root value="node">
    <Tabs.List>
        <Tabs.Trigger value="node">Node.js</Tabs.Trigger>
        <Tabs.Trigger value="vanilla">JS vanilla</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="node">
        <Highlight language={typescript} code={`import {userLogged, disconnectUser} from 'insight-hunt';

// Set user logged
userLogged({
    id: 'XXX',
    email: 'Dummy@gmail.com',
    logoUrl: '...' // Optional,
});

// Remove user logged
disconnectUser();
`} />
    </Tabs.Content>
    <Tabs.Content value="vanilla">
        <Highlight language={typescript} code={`// Set user logged
InsightHunt.userLogged({
    id: 'XXX',
    email: 'Dummy@gmail.com',
    logoUrl: '...' // Optional,
});

// Remove user logged
InsightHunt.disconnectUser();`} />
    </Tabs.Content>
</Tabs.Root>