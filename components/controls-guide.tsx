import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const controls = [
  {
    category: "Basic Controls",
    items: [
      {
        icon: "🎮",
        title: "Movement",
        description: "WASD or Arrow keys to drive",
      },
      {
        icon: "🔄",
        title: "Restart",
        description: "Press Enter or R to restart game",
      },
    ]
  },
  {
    category: "Building Controls",
    items: [
      {
        icon: "🖱️",
        title: "Build Track",
        description: "Left-click to build track pieces",
      },
      {
        icon: "🔄",
        title: "Rotate Item",
        description: "R or Space to rotate track pieces",
      },
      {
        icon: "❌",
        title: "Delete",
        description: "Press X to delete track pieces",
      },
    ]
  },
  {
    category: "Camera Controls",
    items: [
      {
        icon: "🎥",
        title: "Move Camera",
        description: "Right-click + move to pan camera",
      },
      {
        icon: "🔄",
        title: "Rotate View",
        description: "Middle mouse + move or QE keys to rotate",
      },
      {
        icon: "🔍",
        title: "Zoom",
        description: "Mouse scroll to zoom in/out",
      },
      {
        icon: "⬆️",
        title: "Height Adjustment",
        description: "Shift + scroll or ZC to adjust height",
      },
    ]
  }
];

export function ControlsGuide() {
  return (
    <div className="w-[360px] bg-white/80 backdrop-blur-sm rounded-2xl border border-[#FFE5E5] p-4">
      <h3 className="font-heading text-primary text-lg mb-4">Sprunki phase Controls Guide</h3>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="basic" className="flex-1 font-heading text-text-secondary data-[state=active]:text-primary">Basic</TabsTrigger>
          <TabsTrigger value="building" className="flex-1 font-heading text-text-secondary data-[state=active]:text-primary">Building</TabsTrigger>
          <TabsTrigger value="camera" className="flex-1 font-heading text-text-secondary data-[state=active]:text-primary">Camera</TabsTrigger>
        </TabsList>
        {controls.map((section, idx) => (
          <TabsContent 
            key={idx} 
            value={section.category.toLowerCase().split(' ')[0]}
            className="space-y-4"
          >
            {section.items.map((item, itemIdx) => (
              <div key={itemIdx} className="flex items-start space-x-3 p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-heading text-text-primary">{item.title}</h4>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
      <p className="text-xs text-text-secondary mt-4 pt-4 border-t border-[#FFE5E5]">
        Tip: Master these controls to create amazing tracks in Sprunki phase and challenge your friends!
      </p>
    </div>
  )
}
