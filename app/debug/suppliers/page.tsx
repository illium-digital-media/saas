import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DebugSuppliersPage() {
  return (
    <PageLayout title="Debug Suppliers" description="Debug page for supplier-related issues">
      <Card>
        <CardHeader>
          <CardTitle>Supplier Debug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Supplier Routes</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/suppliers" passHref>
                    <Button variant="link" className="p-0 h-auto">
                      /suppliers (Main Suppliers Page)
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/suppliers/directory" passHref>
                    <Button variant="link" className="p-0 h-auto">
                      /suppliers/directory (Suppliers Directory)
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/suppliers/profiles/sup1" passHref>
                    <Button variant="link" className="p-0 h-auto">
                      /suppliers/profiles/sup1 (Example Supplier Profile)
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium">Test Supplier IDs</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Click on these links to test supplier profile pages with different IDs:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link href="/suppliers/profiles/sup1" passHref>
                  <Button variant="outline" size="sm">
                    sup1
                  </Button>
                </Link>
                <Link href="/suppliers/profiles/sup2" passHref>
                  <Button variant="outline" size="sm">
                    sup2
                  </Button>
                </Link>
                <Link href="/suppliers/profiles/sup3" passHref>
                  <Button variant="outline" size="sm">
                    sup3
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

