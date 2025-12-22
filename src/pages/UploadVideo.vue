<template>
  <v-card flat class="pa-6 mx-auto upload-card" max-width="600">
    <h2 class="mb-6 text-h5">Upload Your Video</h2>

    <v-form ref="formRef" v-model="isValid" lazy-validation>
      <!-- Step 1: Video File Upload -->
      <div v-if="!form.videoFile" class="file-upload-box mb-4">
        <v-file-input
          :multiple="false"
          v-model="form.videoFile"
          label="Select Video File"
          accept="video/*"
          prepend-icon="mdi-video"
          show-size
          hide-details
          outlined
          dense
          class="video-file-input"
          @change="onSelect"
        >
          <template #append>
            <v-icon>mdi-upload</v-icon>
          </template>
        </v-file-input>
      </div>

      <!-- Step 2: Show other inputs only if video selected -->
      <div v-else>
        <div class="selected-video-box mb-4">
          <v-icon size="48" class="mr-2">mdi-video</v-icon>
          <span>{{ form.videoFile.name }}</span>
          <v-btn icon small @click="removeVideoFile">
            <v-icon color="red">mdi-close</v-icon>
          </v-btn>
        </div>

        <!-- Title -->
        <v-text-field
          v-model="form.title"
          label="Video Title"
          :rules="[(v) => !!v || 'Title is required']"
          required
          outlined
          dense
          class="mb-4"
        />

        <!-- Description -->
        <v-textarea
          v-model="form.description"
          label="Description"
          rows="3"
          outlined
          dense
          class="mb-4"
        />

        <!-- Thumbnail Upload -->
        <v-file-input
          :multiple="false"
          v-model="form.thumbnailFile"
          label="Thumbnail Image"
          accept="image/*"
          prepend-icon="mdi-image"
          show-size
          hide-details
          outlined
          dense
          class="mb-4"
          @change="onThumbnailSelect"
        >
        </v-file-input>

        <!-- Submit -->
        <v-btn
          :disabled="!isValid || isSubmitting"
          color="primary"
          class="mt-4"
          @click="onSubmit"
        >
          <span v-if="!isSubmitting">Upload Video</span>
          <span v-else>Uploading...</span>
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import type { VForm } from "vuetify/components";
import {
  useConfirmVideo,
  useUploadVideo,
} from "@/composables/video/video.mutation";
import { VideoVisibility, type VideoConfirmDto } from "@/types";
import { useUploadFile } from "@/composables/file/file.mutation";
import { v4 } from "uuid";
import { getUniqueFileName } from "@/utils";

interface VideoForm {
  title: string;
  description: string;
  thumbnailFile: File | null;
  thumbnail: string;
  videoFile: File | null;
}

const formRef = ref<InstanceType<typeof VForm> | null>(null);
const isValid = ref(false);
const isSubmitting = ref(false);

const form = reactive<VideoForm>({
  title: "",
  description: "",
  thumbnail: "",
  thumbnailFile: null,
  videoFile: null,
});

// Remove video file
const removeVideoFile = () => {
  form.videoFile = null;
  form.title = "";
  form.description = "";
  form.thumbnail = "";
  formRef.value?.resetValidation();
};
const { mutate: confirmVideo } = useConfirmVideo();

// Submit handler
const onSubmit = async () => {
  if (!formRef.value?.validate()) return;
  if (!form.videoFile || !form.thumbnail) return;

  isSubmitting.value = true;
  try {
    const payload: VideoConfirmDto = {
      thumbnail: form.thumbnail,
      title: form.title,
      description: form.description,
      visibility: VideoVisibility.Public,
    };
    confirmVideo({ id: data.value?.id || "", video: payload });

    alert("Video uploaded successfully!");
    removeVideoFile();
  } catch (err) {
    console.error(err);
    alert("Failed to upload video.");
  } finally {
    isSubmitting.value = false;
  }
};
const onUploadProgress = (progress: number) => {
  console.log("progress", progress);
};
const onFileUpload = (key: string) => {
  form.thumbnail = key;
};
const { mutate: upload, data, isSuccess } = useUploadVideo(onUploadProgress);
const { mutate: uploadFile } = useUploadFile(onUploadProgress, onFileUpload);
const onSelect = () => {
  const file = form.videoFile;
  if (file) {
    upload(file);
    if (isSuccess) {
      console.log("uploaded successfully");
    }
  } else {
    console.log("file not selected");
  }
};
const onThumbnailSelect = () => {
  const file = form.thumbnailFile;
  if (file && data.value?.id) {
    uploadFile({ file, key: `thumbnail/${getUniqueFileName(file)}` });
  }
};
</script>

<style scoped>
.upload-card {
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.file-upload-box {
  border: 2px dashed #1976d2;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: background 0.2s ease;
}
.file-upload-box:hover {
  background: rgba(25, 118, 210, 0.05);
}

.selected-video-box {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #1976d2;
  border-radius: 12px;
}

.thumbnail-preview {
  display: inline-block;
  margin-top: 8px;
}

.v-file-input .v-input__control {
  min-height: auto;
}
</style>
