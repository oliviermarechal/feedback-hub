<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs";
    import {typescript} from 'svelte-highlight/languages';
    import {Highlight} from 'svelte-highlight';
    import {project} from '../../../stores/project.store';
    import {getDefaultConfiguration} from './default-configuration';
</script>

<Tabs.Root value="node">
    <Tabs.List>
        <Tabs.Trigger value="node">Node.js</Tabs.Trigger>
        <Tabs.Trigger value="vanilla">JS vanilla</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="node">
        <h5>Default implementation</h5>
        <Highlight language={typescript} code={`import {init, setUpFeedbackContainer} from 'insight-hunt';
// import style if you want to use default style
import 'insight-hunt/dist/bundle.css';

// Language is optional, default is 'en'. Available values are 'en' and 'fr'.
await init({ projectApiKey: '${$project?.apiKey || 'YourProjectApiKey'}', language: 'en' });
setUpFeedbackContainer();
`} />
        <h5 class="mt-4">Custom implementation</h5>
        <Highlight language={typescript} code={`import {showUpvote, showFeedbackForm} from 'insight-hunt';

showUpvote('DomContainerId');
showFeedbackForm('DomContainerId');
`} />
    </Tabs.Content>
    <Tabs.Content value="vanilla">
        <h5>Default implementation</h5>
        <Highlight language={typescript} code={getDefaultConfiguration($project?.apiKey)} />
        <h5 class="mt-4">Custom implementation</h5>
        <Highlight language={typescript} code={`InsightHunt.showUpvote('DomContainerId');
InsightHunt.showFeedbackForm('DomContainerId');`} />
    </Tabs.Content>
</Tabs.Root>