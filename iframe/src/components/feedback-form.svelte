<script lang='ts'>
    export let onSubmit;
    let feedback = '';

    function handleSubmit() {
        console.log('COUCOU')
        onSubmit(feedback);
        feedback = '';
    }
</script>

<style>
    /* Stylez le formulaire ici selon vos besoins */
    div {
        text-align: center;
        padding: 10px;
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }

    label {
        display: block;
        margin-bottom: 8px;
    }

    textarea {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 8px;
    }
</style>

<div>
    <label for="feedback">Feedback :</label>
    <textarea id="feedback" bind:value={feedback}></textarea>
    <button on:click={handleSubmit}>Envoyer</button>
</div>