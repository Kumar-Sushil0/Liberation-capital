"use client";

export const FundCapitalSlide = () => {
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
          Fund Capital — Up to $100,000 Deployment
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
          We don't take equity in your identity — only responsibility in your
          evolution.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          When the time is right, and the Player has proven coherence, real
          money enters the game:
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "2rem",
          }}
        >
          Up to <strong>$100,000</strong> to activate the life they designed in
          Crafting and tested in Trial.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "2rem",
          }}
        >
          No equity in your identity, No ownership over your becoming, No
          strings — only responsibility.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "2rem",
          }}
        >
          Great Players don't become customers. They become{" "}
          <strong>mythology</strong>.
        </p>
      </div>
    </div>
  );
};
