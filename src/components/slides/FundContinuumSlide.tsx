"use client";

export const FundContinuumSlide = () => {
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
          ▼ Fund Continuum — Case Studies Become Culture
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
          Culture attracts capital. Capital fuels evolution. The loop expands.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          When evolved humans return to the world, they rewrite how others
          perceive:
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
            discipline
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            identity
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            wealth
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            work
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            purpose
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            transformation
          </li>
          <li
            style={{
              ...textStyle,
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            ambition
          </li>
        </ul>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          That culture attracts the next wave of Patrons. Patrons bring
          capital.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "2rem",
          }}
        >
          Capital funds Players. Players become myth. Myth becomes culture. And
          the continuum continues.
        </p>

        <p
          style={{
            ...textStyle,
            color: "#ffffff",
            marginBottom: "2rem",
          }}
        >
          This isn't a fund. This is an identity economy.
        </p>
      </div>
    </div>
  );
};
