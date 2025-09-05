<template>
  <section className="md:w-1/2 md:basis-1/2 flex-1 overflow-y-auto p-6 md:h-screen md:sticky md:top-0">
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Your Answer
        </h1>
      </header>
      <slot />
    </div>
  </section>
</template>
