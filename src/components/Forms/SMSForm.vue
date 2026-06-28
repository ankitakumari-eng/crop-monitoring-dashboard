<template>
  <div class="card">
    <h3 class="text-lg font-bold text-gray-900 mb-4">📱 Send SMS Advisory</h3>
    
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Farmer Selection -->
      <div>
        <label class="label">Select Farmer</label>
        <select v-model="formData.farmerId" class="input" required>
          <option value="">-- Choose a farmer --</option>
          <option value="1">Ramesh Kumar (9876543210)</option>
          <option value="2">Priya Sharma (9876543211)</option>
        </select>
      </div>

      <!-- Field Selection -->
      <div>
        <label class="label">Select Field</label>
        <select v-model="formData.fieldId" class="input" required>
          <option value="">-- Choose a field --</option>
          <option value="1">Paddy Field - North</option>
          <option value="2">Wheat Field - South</option>
          <option value="3">Maize Field - East</option>
        </select>
      </div>

      <!-- Advisory Type -->
      <div>
        <label class="label">Advisory Type</label>
        <select v-model="formData.type" class="input" required @change="updateMessage">
          <option value="">-- Choose type --</option>
          <option value="irrigation">🚿 Irrigation Advisory</option>
          <option value="pest">🐛 Pest Management</option>
          <option value="nutrient">🌾 Nutrient Management</option>
          <option value="disease">🦠 Disease Warning</option>
          <option value="harvest">✂️ Harvest Recommendation</option>
        </select>
      </div>

      <!-- Message -->
      <div>
        <label class="label">Message</label>
        <textarea 
          v-model="formData.message" 
          class="input" 
          rows="4" 
          placeholder="Your advisory message..."
          required
        ></textarea>
        <p class="text-xs text-gray-500 mt-1">Characters: {{ formData.message.length }}/160</p>
      </div>

      <!-- Buttons -->
      <div class="flex gap-2 pt-4">
        <button type="submit" class="btn-primary flex-1" :disabled="loading">
          {{ loading ? 'Sending...' : 'Send SMS' }}
        </button>
        <button type="button" @click="resetForm" class="btn-secondary">
          Clear
        </button>
      </div>

      <!-- Success/Error Message -->
      <div v-if="successMessage" class="alert alert-success">
        ✅ {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger">
        ❌ {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { smsService } from '../../services/smsService';

const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const formData = ref({
  farmerId: '',
  fieldId: '',
  type: '',
  message: '',
});

const messageTemplates = {
  irrigation: '🚿 Irrigation Advisory: Your field needs irrigation. Please start watering tomorrow morning.',
  pest: '🐛 Pest Alert: Pest activity detected in your field. Apply pesticide treatment immediately.',
  nutrient: '🌾 Nutrient Advisory: Nutrient deficiency detected. Apply recommended fertilizer this week.',
  disease: '🦠 Disease Warning: Disease risk detected. Monitor closely and apply fungicide if symptoms appear.',
  harvest: '✂️ Harvest Ready: Your crop is ready for harvest. Plan harvesting within next 5-7 days.',
};

function updateMessage() {
  if (messageTemplates[formData.value.type]) {
    formData.value.message = messageTemplates[formData.value.type];
  }
}

async function submitForm() {
  if (!formData.value.farmerId || !formData.value.fieldId || !formData.value.message) {
    errorMessage.value = 'Please fill all fields';
    return;
  }

  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await smsService.sendSMSAdvisory(
      formData.value.farmerId,
      formData.value.fieldId,
      formData.value.message
    );
    successMessage.value = 'SMS advisory sent successfully!';
    resetForm();
  } catch (err) {
    errorMessage.value = 'Failed to send SMS: ' + err.message;
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  formData.value = {
    farmerId: '',
    fieldId: '',
    type: '',
    message: '',
  };
}
</script>

<style scoped>
</style>