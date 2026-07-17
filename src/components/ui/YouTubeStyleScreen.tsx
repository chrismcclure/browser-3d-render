const THUMBNAIL_SRC = '/assets/mr-feast-thumbnail.png'

const VIDEO_TITLE = 'I Bought an Entire Island and Turned It Into a Buffet'
const CREATOR_NAME = 'MrFeast'
const VIEW_META = '12M views • 2 days ago'

const SUGGESTED_VIDEO_COLORS = ['#8b3a3a', '#2f5d8a', '#3a6b4d', '#6b4a8b']

function SuggestedVideoPlaceholder({ accentColor }: { accentColor: string }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        padding: 4,
        borderRadius: 4,
        background: 'rgba(255, 255, 255, 0.04)',
      }}
    >
      <div
        style={{
          width: 52,
          height: 30,
          borderRadius: 3,
          background: accentColor,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div
          style={{
            height: 6,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.18)',
          }}
        />
        <div
          style={{
            height: 5,
            width: '70%',
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
      </div>
    </div>
  )
}

export default function YouTubeStyleScreen() {
  return (
    <div
      style={{
        width: 480,
        height: 268,
        boxSizing: 'border-box',
        padding: 10,
        background: '#111111',
        color: '#f1f1f1',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', gap: 10, height: '100%' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 6,
              overflow: 'hidden',
              background: '#000',
              flex: 1,
            }}
          >
            <img
              src={THUMBNAIL_SRC}
              alt=""
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 4,
                background: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div
                style={{
                  width: '38%',
                  height: '100%',
                  background: '#e62117',
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 8,
            }}
          >
            <button
              type="button"
              aria-hidden
              style={{
                width: 28,
                height: 28,
                border: 'none',
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.14)',
                color: '#fff',
                fontSize: 12,
                lineHeight: 1,
                padding: 0,
              }}
            >
              ▶
            </button>
            <button
              type="button"
              aria-hidden
              style={{
                width: 28,
                height: 28,
                border: 'none',
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                fontSize: 12,
                lineHeight: 1,
                padding: 0,
              }}
            >
              ❚❚
            </button>
            <div
              style={{
                marginLeft: 4,
                fontSize: 11,
                color: 'rgba(255, 255, 255, 0.55)',
              }}
            >
              4:32 / 12:08
            </div>
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.25,
            }}
          >
            {VIDEO_TITLE}
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 12,
              fontWeight: 600,
              color: '#ff6b6b',
            }}
          >
            {CREATOR_NAME}
          </div>
          <div
            style={{
              marginTop: 2,
              fontSize: 11,
              color: 'rgba(255, 255, 255, 0.55)',
            }}
          >
            {VIEW_META}
          </div>
        </div>

        <div
          style={{
            width: 118,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.45)',
              marginBottom: 2,
            }}
          >
            Up next
          </div>
          {SUGGESTED_VIDEO_COLORS.map((color, index) => (
            <SuggestedVideoPlaceholder key={index} accentColor={color} />
          ))}
        </div>
      </div>
    </div>
  )
}
