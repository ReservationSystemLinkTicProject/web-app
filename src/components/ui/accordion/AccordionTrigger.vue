<script setup>
import { computed } from "vue";
import { AccordionHeader, AccordionTrigger } from "radix-vue";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  className: { type: null, required: false }, // Cambiado de "class" a "className"
});

const delegatedProps = computed(() => {
  const { className: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger v-bind="delegatedProps" :class="cn(
      'flex flex-1 items-center justify-between py-4 font-medium border-black transition-all [&[data-state=open]>svg]:rotate-180',
      props.className // Usando className en lugar de class
    )">
      <slot />
      <slot name="icon">
        <ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
