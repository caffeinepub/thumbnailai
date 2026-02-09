import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Template, ThumbnailConfig } from '@/backend';

export function useTemplates() {
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  const templatesQuery = useQuery<Template[]>({
    queryKey: ['templates'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTemplates();
    },
    enabled: !!actor && !actorFetching,
  });

  const createTemplateMutation = useMutation({
    mutationFn: async ({ name, config }: { name: string; config: ThumbnailConfig }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createTemplate(name, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteTemplate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });

  return {
    templates: templatesQuery.data || [],
    isLoading: templatesQuery.isLoading,
    createTemplate: createTemplateMutation,
    deleteTemplate: deleteTemplateMutation,
  };
}
