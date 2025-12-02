"use client";

export const FundSupportSlide = () => {
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
          Fund Support — Funding-In-Kind (FIK)
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
          Sometimes the most valuable funding is everything except cash.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          Money is only one form of fuel. Often, it's not even the most
          powerful.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          FIK includes:
        </p>

        <ul
          style={{
            listStyleType: "disc",
            paddingLeft: "2rem",
            marginBottom: "2rem",
          }}
        >
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            mentorship
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            clarity architecture
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            emotional scaffolding
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            discipline engineering
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            attention resources
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            creative tooling
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            behavioral systems
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            EPiCENTRE access
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            identity reinforcement
          </li>
        </ul>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          For some players, FIK is more transformative than money.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          For others, it's the bridge to receive money later.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "2rem",
          }}
        >
          Either way: This is funding designed to evolve a human, not inflate a
          valuation.
        </p>
      </div>
    </div>
  );
};
