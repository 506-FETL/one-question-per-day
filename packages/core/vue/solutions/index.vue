<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const urlDay = localStorage.getItem('urlDay') || '/01'
const urlSolver = localStorage.getItem('urlSolver') || '/gcy'

router.replace({ path: `${urlSolver}${urlDay}` })
</script>
