import type { FC } from 'react'
import { memo } from 'react'
import type { NodeProps } from 'reactflow'
import {
  Handle,
  Position,
} from 'reactflow'
import type { Node } from '../types'
import { BlockEnum } from '../types'
import {
  NodeComponentMap,
  PanelComponentMap,
} from './constants'
import BaseNode from './_base/node'
import BasePanel from './_base/panel'

const CustomNode = (props: NodeProps) => {
  const nodeData = props.data
  const NodeComponent = NodeComponentMap[nodeData.type]

  return (
    <>
      <Handle
        type='target'
        position={Position.Left}
        className={`
          !top-[17px] !left-0 !w-4 !h-4 !bg-transparent !rounded-none !outline-none !border-none !translate-y-0 z-[1]
          after:absolute after:w-0.5 after:h-2 after:-left-0.5 after:top-1 after:bg-primary-500
          ${nodeData.type === BlockEnum.Start && 'opacity-0'}
        `}
        isConnectable={nodeData.type !== BlockEnum.Start}
      />
      <BaseNode { ...props }>
        <NodeComponent />
      </BaseNode>
      <Handle
        type='source'
        position={Position.Right}
        className={`
          !top-[17px] !right-0 !w-4 !h-4 !bg-transparent !rounded-none !outline-none !border-none !translate-y-0 z-[1]
          after:absolute after:w-0.5 after:h-2 after:-right-0.5 after:top-1 after:bg-primary-500
        `}
      />
    </>
  )
}

type PanelProps = {
  node: Node
}
export const Panel: FC<PanelProps> = memo(({
  node,
}) => {
  const PanelComponent = PanelComponentMap[node.data.type]

  return (
    <BasePanel
      id={node.id}
      data={node.data}
    >
      <PanelComponent />
    </BasePanel>
  )
})

Panel.displayName = 'Panel'

export default memo(CustomNode)