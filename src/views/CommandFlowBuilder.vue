<script setup lang="ts">
import CommandsTab from '@/components/app/command-flow-builder/command-tab/CommandsTab.vue'
import ParametersTab from '@/components/app/command-flow-builder/parameter-tab/ParametersTab.vue'
import PageContainer from '@/components/shared/PageContainer.vue'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCommandFlowLocalStorage } from '@/composables/use-command-flow'
import { ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const { getCommandFlowById } = useCommandFlowLocalStorage()

const commandFlow = getCommandFlowById(route.params.id as string)
</script>

<template>
  <PageContainer>
    <div v-if="!commandFlow" class="py-8 my-12 text-center border rounded-lg">
      <p class="mb-4 text-lg text-muted-foreground">
        Command flow not found
      </p>
      <Button variant="outline" @click="router.push('/command-flows')">
        <ArrowLeft class="w-4 h-4" />
        Back to Command Flows
      </Button>
    </div>

    <div v-else>
      <div class="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" @click="router.back()">
          <ArrowLeft class="w-4 h-4" />
        </Button>
        <h1 class="text-2xl font-bold">
          {{ commandFlow.name }}
        </h1>
      </div>

      <Tabs default-value="commands">
        <TabsList>
          <TabsTrigger value="commands">
            Commands
          </TabsTrigger>
          <TabsTrigger value="parameters">
            Parameters
          </TabsTrigger>
        </TabsList>
        <TabsContent value="commands">
          <CommandsTab :command-flow="commandFlow" />
        </TabsContent>
        <TabsContent value="parameters">
          <ParametersTab :command-flow="commandFlow" />
        </TabsContent>
      </Tabs>
    </div>
  </PageContainer>
</template>
