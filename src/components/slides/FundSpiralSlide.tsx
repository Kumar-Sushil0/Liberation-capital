"use client";

export const FundSpiralSlide = () => {
  const textStyle = {
    fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
    lineHeight: 1.5,
    margin: 0,
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
          width: "100%",
        }}
      >
        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            fontWeight: "bold",
            marginBottom: "2rem",
            fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
          }}
        >
          ▼ Fund Spiral — Investors Become Players
        </p>

        <p
          style={{
            ...textStyle,
            color: "#b8b8b8",
            fontStyle: "italic",
            marginBottom: "2rem",
            paddingLeft: "1.5rem",
            borderLeft: "3px solid #444",
          }}
        >
          Meaning is the real liquidity — not money.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          Patrons arrive to fund others. They leave realizing something deeper:
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          They haven't designed themselves yet. Watching Players evolve reveals
          their own coherence gaps.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          Funding becomes a mirror. Support becomes an awakening.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "2rem",
          }}
        >
          Meaning becomes the new currency. The Patron becomes the next Player.
          The spiral turns.
        </p>
      </div>
    </div>
  );
};
