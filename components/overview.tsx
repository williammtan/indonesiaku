import { Card, CardContent } from "@/components/ui/card"

interface OverviewProps {
  stats: {
    translations: number;
    languages: number;
    languagePairs: number;
    contributors: number;
  }
}

export function Overview({ stats }: OverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.translations.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">TRANSLATIONS</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.languages}</div>
            <div className="text-sm text-muted-foreground">LANGUAGES</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.languagePairs}</div>
            <div className="text-sm text-muted-foreground">LANGUAGE PAIRS</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.contributors}</div>
            <div className="text-sm text-muted-foreground">CONTRIBUTORS</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 