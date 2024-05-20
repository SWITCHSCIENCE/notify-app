<script>
  import { clipboard } from "@skeletonlabs/skeleton";
  let contents = "{}";
  const vapidPublicKey =
    "BA5GSOTHKfCUOtPMYFdht02DBDOqp-bVbl84JNk4AuKBhIs9MlyItwO38-VdZt4xiiYW5QJleDCr8NCQevEUXjw";
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
    navigator.serviceWorker.register("../service-worker.js");
    let registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await subscribe(registration);
    }
    contents = JSON.stringify(subscription);
  }
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="card h-full">
    <header class="card-header items-center">
      <button class="btn variant-filled" on:click={subscribeClick}>
        Subscribe
      </button>
    </header>
    <section class="p-4">
      <div
        class="box-border w-96 md:box-content text-wrap break-words"
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
