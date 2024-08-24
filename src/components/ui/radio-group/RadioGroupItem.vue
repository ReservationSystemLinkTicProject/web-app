<script setup>
import { computed } from "vue";
import {
  RadioGroupIndicator,
  RadioGroupItem,
  useForwardProps,
} from "radix-vue";
import { Circle } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps({
  id: {  required: false },
  value: {  required: false },
  disabled: {  required: false },
  required: {  required: false },
  name: {  required: false },
  asChild: {  required: false },
  as: {  required: false },
  class: {  required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    :class="cn(
      'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <Circle class="h-2.5 w-2.5 fill-current text-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
