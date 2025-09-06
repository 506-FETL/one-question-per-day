<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const urlDay = localStorage.getItem('urlDay') || '/01'

router.replace({ path: urlDay })
</script>
