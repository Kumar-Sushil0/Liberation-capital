"use client";

export const FundEnvironmentSlide = () => {
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
          ▼ Fund Environment — EPiCENTRE Residency
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
          Some identities require a sealed ecosystem to hatch.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          EPiCENTRE is the crucible, but also the incubator.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          A monastic, silent, reality-heavy chamber where new identities
          stabilize
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "2rem",
          }}
        >
          before they re-enter the world.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          This is where:
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
            coherence strengthens
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            discipline deepens
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            clarity compounds
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            distractions disappear
          </li>
        </ul>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "2rem",
          }}
        >
          It is not a retreat. It is an identity accelerator in its purest
          biological form.
        </p>
      </div>
    </div>
  );
};
