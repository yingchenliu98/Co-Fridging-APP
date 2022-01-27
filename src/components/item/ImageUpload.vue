<template>
  <div class="ImageUpload">
    <input type="file" accept="image/*" @change="onChange" />
    <div>
      <img
        v-if="selectedImage.imageUrl"
        :src="selectedImage.imageUrl"
        contain
        height="100px"
        width="150px"
      />
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "ImageUpload",
  data() {
    return {
      selectedImage: {
        image: null,
        imageUrl: null,
      },
    };
  },
  mounted: function () {
    eventBus.$on("create-item-success", () => {
      this.selectedImage.image = null;
      this.selectedImage.imageUrl = null;
    });
  },
  methods: {
    onChange(e) {
      const file = e.target.files[0];
      this.image = file;
      this.selectedImage.imageUrl = URL.createObjectURL(file);
      eventBus.$emit("upload-image", {
        data: this.selectedImage.imageUrl,
      });
    },
  },
};
</script>
