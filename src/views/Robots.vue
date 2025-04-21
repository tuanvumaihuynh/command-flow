<script setup lang="ts">
import type { Robot } from '@/types/robot'
import CreateRobotDialog from '@/components/app/robots/CreateRobotDialog.vue'
import EditRobotDialog from '@/components/app/robots/EditRobotDialog.vue'
import RobotCard from '@/components/app/robots/RobotCard.vue'
import PageContainer from '@/components/shared/PageContainer.vue'
import Button from '@/components/ui/button/Button.vue'
import { useRobotLocalStorage } from '@/composables/use-robot'
import { Plus } from 'lucide-vue-next'

const { robots, deleteRobot } = useRobotLocalStorage()

const selectedRobot = ref<Robot | null>(null)

const showCreateDialog = ref(false)
const showEditDialog = ref(false)

function handleEdit(robot: Robot) {
  selectedRobot.value = robot
  showEditDialog.value = true
}

function handleDelete(robot: Robot) {
  selectedRobot.value = robot
  deleteRobot(robot.id)
}
</script>

<template>
  <PageContainer>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        Robots
      </h1>
      <Button @click="showCreateDialog = true">
        <Plus class="w-4 h-4" />
        Add Robot
      </Button>
    </div>

    <div v-if="robots.length === 0" class="py-8 my-12 text-center border rounded-lg">
      <p class="text-lg text-muted-foreground">
        No robots found
      </p>
      <p class="mt-2 text-sm text-muted-foreground">
        Click the 'Add Robot' button to create your first robot
      </p>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <RobotCard
        v-for="robot in robots"
        :key="robot.id"
        :robot="robot"
        @edit="handleEdit(robot)"
        @delete="handleDelete(robot)"
      />
    </div>

    <CreateRobotDialog v-model:open="showCreateDialog" />
    <EditRobotDialog v-if="selectedRobot" v-model:open="showEditDialog" :robot="selectedRobot" />
  </PageContainer>
</template>
