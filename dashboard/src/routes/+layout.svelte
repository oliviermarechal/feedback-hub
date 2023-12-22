<script lang="ts">
    import '../app.postcss';
    import xml from 'highlight.js/lib/languages/xml';
    import hljs from 'highlight.js/lib/core';
    import javascript from 'highlight.js/lib/languages/javascript';
    import typescript from 'highlight.js/lib/languages/typescript';
    import 'highlight.js/styles/github-dark.css';
    import { storeHighlightJs } from '@skeletonlabs/skeleton';


    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);

    storeHighlightJs.set(hljs);
</script>

<slot />