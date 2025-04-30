<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-8">

      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">{{ $t('accountPage.title') }}</h2>

      <section aria-labelledby="user-info-heading">
        <h3 id="user-info-heading" class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">{{ $t('accountPage.userInfo.title') }}</h3>
        <div v-if="authStore.loading && !authStore.user" class="text-center text-gray-500">
          {{ $t('accountPage.userInfo.loading') }}
        </div>
        <div v-else-if="authStore.user" class="space-y-3">
          <div>
            <span class="font-medium text-gray-600">{{ $t('accountPage.userInfo.username') }}</span>
            <span class="ml-2 text-gray-800">{{ authStore.user.username || $t('common.notAvailable') }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-600">{{ $t('accountPage.userInfo.email') }}</span>
            <span class="ml-2 text-gray-800">{{ authStore.user.email || $t('common.notAvailable') }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-600">{{ $t('accountPage.userInfo.memberSince') }}</span>
            <span class="ml-2 text-gray-800">{{ formattedJoinDate }}</span>
          </div>
          <LanguagePicker/>
        </div>
        <div v-else class="text-center text-red-500">
          {{ $t('accountPage.userInfo.error') }}
        </div>
      </section>

      <section aria-labelledby="change-password-heading">
        <h3 id="change-password-heading" class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">{{ $t('accountPage.changePassword.title') }}</h3>
        <form @submit.prevent="handleChangePassword" class="space-y-4">
          <div>
            <label for="currentPassword" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('accountPage.changePassword.currentPasswordLabel') }}</label>
            <input
                type="password"
                id="currentPassword"
                v-model="passwordData.currentPassword"
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                autocomplete="current-password"
            >
          </div>
          <div>
            <label for="newPassword" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('accountPage.changePassword.newPasswordLabel') }}</label>
            <input
                type="password"
                id="newPassword"
                v-model="passwordData.newPassword"
                required
                minlength="8"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                autocomplete="new-password"
            >
            <p v-if="passwordMismatch" class="text-red-500 text-xs italic mt-1">{{ $t('accountPage.changePassword.passwordMismatch') }}</p>
          </div>
          <div>
            <label for="confirmNewPassword" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('accountPage.changePassword.confirmNewPasswordLabel') }}</label>
            <input
                type="password"
                id="confirmNewPassword"
                v-model="passwordData.confirmNewPassword"
                required
                minlength="8"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                autocomplete="new-password"
            >
          </div>
          <div v-if="authStore.error" class="text-red-500 text-sm">{{ authStore.error }}</div>
          <div v-if="successMessage" class="text-green-600 text-sm">{{ successMessage }}</div>
          <button
              type="submit"
              :disabled="authStore.loading || passwordMismatch"
              class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {{ authStore.loading ? $t('accountPage.changePassword.changing') : $t('accountPage.changePassword.changeButton') }}
          </button>
        </form>
      </section>

      <section aria-labelledby="logout-heading">
        <h3 id="logout-heading" class="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">{{ $t('accountPage.logout.title') }}</h3>
        <p class="text-gray-600 mb-4">{{ $t('accountPage.logout.description') }}</p>
        <button
            @click="handleLogout"
            :disabled="authStore.loading"
            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {{ authStore.loading ? $t('accountPage.logout.loggingOut') : $t('accountPage.logout.logoutButton') }}
        </button>
      </section>

      <section aria-labelledby="danger-zone-heading" class="border border-red-300 rounded-lg p-6 bg-red-50">
        <h3 id="danger-zone-heading" class="text-xl font-semibold text-red-700 mb-4">{{ $t('accountPage.dangerZone.title') }}</h3>
        <p class="text-red-600 mb-4">{{ $t('accountPage.dangerZone.description') }}</p>
        <button
            @click="showDeleteConfirmation = true"
            :disabled="authStore.loading"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {{ authStore.loading ? $t('accountPage.dangerZone.deleting') : $t('accountPage.dangerZone.deleteButton') }}
        </button>
        <ConfirmationModal
            v-model="showDeleteConfirmation"
            :title="$t('accountPage.dangerZone.confirmDeleteTitle')"
            :message="$t('accountPage.dangerZone.confirmDeleteMessage')"
            :confirm-text="$t('accountPage.dangerZone.confirmDeleteConfirm')"
            :cancel-text="$t('accountPage.dangerZone.confirmDeleteCancel')"
            confirm-button-type="danger"
            @confirm="handleDeleteAccount"
        />
        <div v-if="deleteError" class="text-red-700 text-sm mt-4">{{ deleteError }}</div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Assuming your store path
import { useRouter } from 'vue-router';
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import LanguagePicker from "@/components/LanguagePicker.vue";


interface PasswordData {
  currentPassword: '';
  newPassword: '';
  confirmNewPassword: '';
}

const authStore = useAuthStore();
const router = useRouter();

// --- State ---
const passwordData = reactive<PasswordData>({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});
const successMessage = ref<string | null>(null); // For password change success
const deleteError = ref<string | null>(null); // Specific error for deletion failure

// --- Computed Properties ---
const passwordMismatch = computed(() => {
  return passwordData.newPassword && passwordData.confirmNewPassword && passwordData.newPassword !== passwordData.confirmNewPassword;
});

// Format join date (example)
const formattedJoinDate = computed(() => {
  if (authStore.user?.created_at) {
    try {
      return new Date(authStore.user.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  }
  return 'N/A';
});

// --- Methods ---

// Handle Password Change Submission
const handleChangePassword = async () => {
  if (passwordMismatch.value) {
    authStore.setError('New passwords do not match.'); // Use store's error handling or a local ref
    return;
  }
  authStore.clearError(); // Clear previous errors
  successMessage.value = null; // Clear previous success message

  try {
    // Assume authStore.changePassword exists and handles API call + state updates
    await authStore.changePassword({
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword,
    });

    // If successful (no error thrown by store action):
    successMessage.value = 'Password changed successfully!';
    // Clear form
    passwordData.currentPassword = '';
    passwordData.newPassword = '';
    passwordData.confirmNewPassword = '';

  } catch (error) {
    // Error should be set within the authStore action ideally
    console.error("Password change failed:", error);
    // If the store doesn't set the error message, you might set it here
    if (!authStore.error) {
      authStore.setError('Failed to change password. Please check your current password.');
    }
  }
};

// Handle Logout
const handleLogout = async () => {
  authStore.clearError();
  try {
    await authStore.logout();
    // Redirect to login or home page after logout
    router.push({ name: 'login' }); // Adjust route name if needed
  } catch (error) {
    console.error("Logout failed:", error);
    // Error should be handled/displayed by the store or globally
    if (!authStore.error) {
      authStore.setError('Logout failed. Please try again.');
    }
  }
};

// Confirm Account Deletion
const confirmDeleteAccount = () => {
  // Use a more robust confirmation modal in a real app
  if (window.confirm('Are you absolutely sure you want to delete your account? This action is irreversible!')) {
    handleDeleteAccount();
  }
};

const showDeleteConfirmation = ref(false);

// Handle Account Deletion
const handleDeleteAccount = async () => {
  authStore.clearError();
  deleteError.value = null; // Clear previous delete error

  try {
    // Assume authStore.deleteAccount exists
    await authStore.deleteAccount();
    // Redirect after successful deletion
    alert('Account deleted successfully.'); // Replace with better notification
    router.push({ name: 'home' }); // Or registration page
  } catch (error) {
    console.error("Account deletion failed:", error);
    // Set specific delete error message
    deleteError.value = authStore.error || 'Failed to delete account. Please try again.';
  }
};

// --- Lifecycle Hooks ---
onMounted(() => {
  // Clear any previous errors or success messages when component loads
  authStore.clearError();
  successMessage.value = null;
  deleteError.value = null;

  // Optional: Fetch user data if not already loaded by the store
  // if (!authStore.user) {
  //   authStore.fetchUser(); // Assuming fetchUser exists
  // }
});

</script>

<style scoped>
/* Account page specific styles */
/* Add custom styles here if Tailwind classes are insufficient */

/* Example: Style for the danger zone heading */
#danger-zone-heading {
  /* Additional styles if needed */
}

/* Ensure inputs don't inherit weird browser defaults */
input[type="password"] {
  /* Add specific styles if necessary */
}
</style>