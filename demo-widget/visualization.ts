import type { EChartsVisualizationConfig, VisualizationContext } from '@ossinsight/widgets-types';

export default function (input: unknown, ctx: VisualizationContext): EChartsVisualizationConfig {

  const { red } = ctx.theme.colors;
  const { collection_id } = ctx.parameters;

  // Create config from input

  return {
    // ...
  };
}

export const type = 'chartjs';
