"use client"

import { PageLayout } from "@/components/page-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SuppliersDirectory } from "@/components/suppliers-directory"
import { SupplierOrderHistory } from "@/components/supplier-order-history"
import { PreferredSuppliers } from "@/components/preferred-suppliers"

export function SuppliersPage() {
  return (
    <PageLayout title="Suppliers" description="Manage your watch suppliers and track orders" showSearch={false}>
      <Tabs defaultValue="directory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="directory">Supplier Directory</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="preferred">Preferred Suppliers</TabsTrigger>
        </TabsList>
        <TabsContent value="directory" className="space-y-4">
          <SuppliersDirectory />
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <SupplierOrderHistory />
        </TabsContent>
        <TabsContent value="preferred" className="space-y-4">
          <PreferredSuppliers />
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}

