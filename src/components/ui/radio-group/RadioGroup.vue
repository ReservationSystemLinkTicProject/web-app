<script setup>
import { computed } from "vue";
import { RadioGroupRoot, useForwardPropsEmits } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  modelValue: { required: false },
  defaultValue: { required: false },
  disabled: { required: false },
  name: { required: false },
  required: { required: false },
  orientation: { required: false },
  dir: { required: false },
  loop: { required: false },
  asChild: { required: false },
  as: { required: false },
  class: { required: false },
});
const emits = defineEmits(["update:modelValue"]);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <RadioGroupRoot :class="cn('grid gap-2', props.class)" v-bind="forwarded">
    <slot />
  </RadioGroupRoot>
</template>
