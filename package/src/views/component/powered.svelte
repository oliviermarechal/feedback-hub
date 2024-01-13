<script>
    import { getHomepage } from "../../../../global-config.js";

    const homepageUrl = getHomepage(process.env.NODE_ENV ? process.env.NODE_ENV : 'production');
</script>

<small class="flex justify-end">Powered by&nbsp;<a href='{homepageUrl}'><u>Insight hunt</u></a></small>