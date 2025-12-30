<template>
  <div class="loading">
    <div class="spinner" />
    <p>フォントを読み込んでいます…</p>
  </div>
</template>

<style scoped>
.loading {
  height: calc(100vh - 60px);
  display: grid;
  place-content: center;
  gap: 12px;
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #ccc;
  border-top-color: #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
