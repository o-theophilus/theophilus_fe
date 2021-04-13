<script>
    export let title = "title"

</script>

<div class="breaker">
    <h1 class="breaker__title" >
        {title}

    </h1>
</div>

<style type="text/scss">

    $dNavHeight: 5rem;

.breaker{
    height: calc(100vh - #{$dNavHeight});
    background-color: orange;
    display: flex;
}
.breaker__title{
    color: white;
    font-size: 2em;
    font-weight: bolder;

    align-self: center;
    margin: auto;
    /* justify-items: center; */
    /* justify-self: center; */
    /* justify-content: center; */
}
</style>