import { Card, Col, Divider, List, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import type { InventoryItem } from '../../utils/web/chartService'

const { Title, Text } = Typography

interface InventorySummaryProps {
  inventoryData: InventoryItem[]
  height?: number
}

const InventorySummary: React.FC<InventorySummaryProps> = ({
  inventoryData,
  height = 400,
}) => {
  const { t } = useTranslation()

  return (
    <Col xs={24} lg={8}>
      <Card title={t('current_inventory_items')} style={{ height }}>
        <List
          dataSource={inventoryData}
          style={{ maxHeight: height - 120, overflow: 'auto' }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong>{item.name}</Text>
                    <Text strong>${item.price}</Text>
                  </div>
                }
                description={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary">{item.category}</Text>
                    <Tag color={item.stock > 20 ? 'green' : 'orange'}>
                      {item.stock} {t('in_stock')}
                    </Tag>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </Col>
  )
}

export default InventorySummary