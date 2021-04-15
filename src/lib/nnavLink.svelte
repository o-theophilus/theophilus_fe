<script>
	// export let segment
	import { page } from '$app/stores'

	
	export let name
	export let link
	
	let page_
	link = link===undefined?name:link
	page_ = link===""?undefined:link
	$: segment = $page.path.split("/")[1] || undefined

</script>

<style>
.nav__block__link{
	width: 100%;

	text-decoration: none;
	text-align: center;
	color: white;

	display: flex;

	justify-content: center;
	align-items: center;
}

.nav__block__link--active{
	border-width: 5px;
	border-color: orange;
	border-bottom-style: solid;

	font-weight: bold;

}

.nav__block__link__item{
	list-style-type: none;
	text-transform: capitalize;
}
</style>


<a class="nav__block__link" class:nav__block__link--active={segment === page_} href="/{link}">
	<li class="nav__block__link__item">
		{name}
	</li>
</a>