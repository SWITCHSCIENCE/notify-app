<script>
  import "../app.postcss";
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { autoModeWatcher } from "@skeletonlabs/skeleton";

  // Floating UI for Popups
  import {
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow,
  } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";
  import { Toast, initializeStores } from "@skeletonlabs/skeleton";
  import { AppBar, LightSwitch } from "@skeletonlabs/skeleton";
  import "../app.postcss";
  initializeStores();
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  onMount(() => {
    autoModeWatcher();
  });
</script>

<svelte:head>
  <title>Notify App</title>
</svelte:head>

<Toast />
<AppBar
  class="mb-4"
  gridColumns="grid-cols-3"
  slotDefault="place-self-center"
  slotTrail="place-content-end"
>
  <svelte:fragment slot="lead">
    <a href="{base}/">
      <svg
        class="display: inline-block"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 16 16"
        ><path
          fill="currentColor"
          fill-rule="evenodd"
          d="M8 1a1 1 0 0 0-1 1v.1A5 5 0 0 0 3 7v4l-1.205 1.328c-.583.643-.127 1.672.74 1.672h3.733a2 2 0 0 0 3.464 0h3.733c.867 0 1.323-1.03.74-1.672L13 11V7a5 5 0 0 0-4-4.9V2a1 1 0 0 0-1-1M4.5 11.58l-.39.428l-.446.492h8.672l-.447-.492l-.389-.429V7a3.5 3.5 0 1 0-7 0z"
          clip-rule="evenodd"
        />
      </svg>
      NotifyApp
    </a>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <a href="{base}/about/">About</a>
    <LightSwitch />
  </svelte:fragment>
</AppBar>
<slot />
