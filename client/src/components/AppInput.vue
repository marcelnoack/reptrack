<template>
  <div class="textfield">
    <input
      type="text"
      autocomplete="off"
      required
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholderValue"
      class="textfield__input"
      :class="{
        'textfield__input--error': error.length > 0 || (maxLength && value.length > maxLength),
        'textfield__input--dense': dense,
        'textfield__input--border-none': border === 'none'
      }"
      :style="{ 'background-color': background, color }"
    />
    <label
      v-if="label"
      for="material-textfield"
      class="textfield__label"
      :class="{ 'textfield__label--hold': value.length > 0 }"
      >{{ label }} {{ required ? "*" : "" }}</label
    >
    <span class="textfield__helpertext" :class="{ 'textfield__helpertext--error': error.length > 0 }">
      {{ error.length > 0 ? error : helperText }}
    </span>
    <span
      v-if="maxLength > 0"
      class="textfield__charcount"
      :class="{ 'textfield__charcount--error': maxLength && value.length > maxLength }"
      >{{ value.length }} / {{ maxLength }}</span
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    maxLength: {
      type: Number,
      required: false
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    helperText: {
      type: String,
      required: false
    },
    error: {
      type: String,
      required: false,
      default: ""
    },
    background: {
      type: String,
      required: false,
      default: "#fff"
    },
    color: {
      type: String,
      required: false,
      default: "var(--primary-text-color)"
    },
    dense: {
      type: Boolean,
      required: false,
      default: false
    },
    border: {
      type: String,
      required: false
    }
    // multiline: {
    //   type: Boolean,
    //   required: false,
    //   default: false
    // }
  },
  computed: {
    placeholderValue(): string {
      return `${!this.label && this.placeholder ? this.placeholder : ""}${
        this.label && !this.placeholder ? this.label : ""
      }${this.required ? "*" : ""}`;
    }
  }
});
</script>

<style scoped>
.textfield {
  width: 100%;
  border-radius: 5px;
  position: relative;
}

.textfield__label {
  position: absolute;
  font-size: 1rem;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--secondary-color);
  background-color: var(--primary-color);
  padding: 0 12px 0 0;
  transition: 0.1s ease-out;
  pointer-events: none;
}

.textfield__label--hold {
  top: 0;
  left: 12px;
  padding: 0 4px;
  font-size: 12px;
}

.textfield__input {
  box-sizing: border-box;
  width: 100%;
  font-size: 1rem;
  outline: none;
  border: 1px solid var(--secondary-color);
  border-radius: 5px;
  padding: 16px 12px 16px 16px;
  color: #000;
  background-color: #fff;
  resize: none;
  transition: 0.1s ease-out;
}

.textfield__input--border-none {
  border: 1px solid transparent;
}

.textfield__input--dense {
  padding: 8px 6px 8px 8px;
}

.textfield__input:focus {
  border: 2px solid var(--secondary-color);
  /* fix moving due to border-width increase by adjusting the padding accordingly */
  padding: 15px 11px 15px 15px;
}

/* on textfield focus, move label */
.textfield__input:focus + .textfield__label {
  color: var(--secondary-color);
  top: 0;
  left: 12px;
  padding: 0 4px;
  font-size: 12px;
}

.textfield__input--error {
  border-color: var(--error-color);
}

.textfield__input--error:focus {
  border-color: var(--error-color);
}

.textfield__input--error:focus + .textfield__label {
  color: var(--error-color);
}

.textfield__helpertext {
  font-size: 12px;
  position: absolute;
  left: 16px;
  bottom: -16px;
  color: var(--secondary-color);
}

.textfield__helpertext--error {
  color: var(--error-color);
  font-weight: bold;
}

.textfield__charcount {
  position: absolute;
  right: 12px;
  bottom: -16px;
  font-size: 12px;
  color: var(--secondary-color);
}

.textfield__charcount--error {
  color: var(--error-color);
  font-weight: bold;
}
</style>
