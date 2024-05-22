<script>
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { clipboard } from "@skeletonlabs/skeleton";
  import { goto, afterNavigate } from "$app/navigation";
  let contents = "";
  let vapidPublicKey = "";
  let pubKey = undefined;
  afterNavigate(() => {
    pubKey = undefined;
    vapidPublicKey = "";
    pubKey = $page.url.searchParams.get("pubKey");
    if (pubKey != undefined) {
      vapidPublicKey = pubKey;
    }
  });
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  }
  async function subscribe(registration) {
    let subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
    return subscription;
  }
  async function subscribeClick() {
    console.log("button clicked");
    $page.url.searchParams.set("pubKey", vapidPublicKey);
    console.log($page.url);
    goto($page.url);
    navigator.serviceWorker.register(base + "/service-worker.js");
    let registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      await subscription.unregister()
    }
    contents = JSON.stringify(await subscribe(registration));
  }
</script>

<div class="container mx-auto">
  <div class="card">
    <header class="card-header">
      <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <span></span>
        <input
          class=""
          type="text"
          placeholder="Public Key"
          bind:value={vapidPublicKey}
          disabled={pubKey != undefined}
        />
        <button class="variant-filled-secondary" on:click={subscribeClick}>
          Subscribe
        </button>
      </div>
    </header>
    <section class="p-4">
      <div
        class="box-border md:box-content text-wrap break-all"
        data-clipboard="subscription"
      >
        {contents}
      </div>
    </section>
    <footer class="card-footer flex flex-row-reverse">
      <button
        class="btn variant-filled"
        use:clipboard={{ element: "subscription" }}>Copy</button
      >
    </footer>
  </div>
</div>
