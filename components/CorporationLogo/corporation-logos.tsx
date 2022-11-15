const corporationLogs: Record<
  string,
  ({ size }: { size: number }) => JSX.Element
> = {
  "00fc0717-e38c-4c9e-aa97-ebe477e0b0e1": ({ size }: { size: number }) => (
    <span
      style={{
        fontSize: `${size * 0.95}px`,
        lineHeight: 1.1,
        fontFamily: "Prototype",
        color: "rgb(0,180,0)",
        letterSpacing: size * 0.04,
        textShadow:
          "-1px 0 #404040, 0 1px #404040, 1px 0 #404040, 0 -1px #404040",
      }}
    >
      ecoline
    </span>
  ),
  "3a0b613c-ac6c-4457-aafb-7a57b0446abf": ({ size }: { size: number }) => (
    <span
      style={{
        fontSize: `${size * 0.833}px`,
        backgroundColor: "#dddddd",
        color: "white",
        fontFamily: "Times New Roman",
        lineHeight: 1.2,
        border: `${size * 0.033}px solid purple`,
        padding: `${size * 0.04}px ${size * 0.12}px ${size * 0.04}px`,
        textShadow:
          "-1px 0 purple, 0 1px purple, 1px 0 purple, 0 -1px purple, 1px 1px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      credicor
    </span>
  ),
  "50689566-ef19-41cf-bdea-4af43d890bc6": ({ size }: { size: number }) => (
    <div
      style={{
        fontSize: `${size * 0.618}px`,
        fontFamily: "Prototype",
        width: `${size * 4}px`,
        textAlign: "center",
        border: "2px solid black",
        background: "#e6e600",
        borderRadius: size * 0.058,
      }}
    >
      helion
    </div>
  ),
  "afe28e1b-75be-4805-a9f1-24612df4c9c8": ({ size }: { size: number }) => (
    <div style={{ width: `${size * 2.4}px` }}>
      <span
        style={{
          fontSize: `${size * 0.456}px`,
          textTransform: "uppercase",
          fontFamily: "Prototype",
          lineHeight: 1.1,
          color: "#c9380e",
          display: "inline-block",
          position: "relative",
          left: `${size / 2}px`,
          transform: "scale(1.5, 1)",
        }}
      >
        Mining
        <br />
        Guild
      </span>
    </div>
  ),
  "91c5ee0d-afc2-44cd-a690-9758f14f5c5a": ({ size }: { size: number }) => (
    <div
      style={{
        position: "relative",
        height: `${size}px`,
      }}
    >
      <div
        style={{
          fontSize: `${size * 0.29}px`,
          fontFamily: "Prototype",
          lineHeight: 1.17,
          textAlign: "center",
        }}
      >
        INTERPLANETARY
      </div>
      <div
        style={{
          border: "5px solid #cc3333",
        }}
      >
        <div
          style={{
            height: `${size * 0.172}px`,
            width: `${size * 2.465}px`,
            boxSizing: "border-box",
            background:
              "linear-gradient(to right, yellow,black,yellow,black,yellow)",
            backgroundImage:
              "linear-gradient(to right, yellow, black, yellow, black, yellow)",
          }}
        />
      </div>
      <div
        style={{
          fontSize: `${size * 0.413}px`,
          fontFamily: "Prototype",
          position: "relative",
          top: `-${size * 0.165}px`,
          transform: "scale(1, 0.5)",
          textAlign: "center",
        }}
      >
        CINEMATICS
      </div>
    </div>
  ),
  "04213f5f-c8f4-4039-9be7-7c8f230b9ae1": ({ size }: { size: number }) => (
    <span
      style={{
        fontSize: `${size * 0.8}px`,
        fontFamily: "Prototype",
      }}
    >
      <span
        style={{
          backgroundColor: "#6bb5c7",
          paddingLeft: `${size * 0.142}px`,
          paddingRight: `${size * 0.142}px`,
          fontSize: `${size * 0.8}px`,
        }}
      >
        X
      </span>{" "}
      INVENTRIX
    </span>
  ),
  "2689fd3f-47cb-4cb4-8090-7b697be962d7": ({ size }: { size: number }) => (
    <div style={{ width: size * 4.28 }}>
      <span
        style={{
          fontSize: `${size * 0.57}px`,
          position: "relative",
          left: `${size * 0.375}px`,
          color: "white",
          lineHeight: 1.66,
          background: "#32004d",
          paddingLeft: `${size * 0.2}px`,
          paddingRight: `${size * 0.2}px`,
          border: "1px solid #444",
          borderRadius: `${size * 0.25}px`,
          fontFamily: "TimesNewRoman",
          display: "inline-block",
          transform: "scale(1.2,1)",
        }}
      >
        PHOBOLOG
      </span>
    </div>
  ),
  "9d478013-8e0a-43c2-8275-f89e97fbb23d": ({ size }: { size: number }) => (
    <div
      style={{
        fontFamily: "Prototype",
        fontSize: `${size * 0.32}px`,
      }}
    >
      <div
        style={{
          textShadow: "none",
          marginRight: `${size * 0.08}px`,
          border: "1px solid red",
          display: "inline-block",
          backgroundColor: "#ff5f00",
        }}
      >
        ▲
        <span
          style={{
            fontSize: `${size * 0.194}px`,
            padding: "0px",
            border: "none",
            marginLeft: `-${size * 0.07}px`,
          }}
        >
          ▲
        </span>
      </div>
      THARSIS
      <br />
      &nbsp; REPUBLIC
    </div>
  ),
  "db4eef05-5c5e-4df9-b808-ceae8842c673": ({ size }: { size: number }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          boxShadow: "0001px rgb(000/60%), 0002px rgb(000/30%)",
          width: `${size * 0.833}px`,
          height: `${size * 0.833}px`,
          backgroundSize: `${size * 1.04}px`,
          backgroundPosition: `-${size * 0.104}px`,
          textAlign: "center",
          borderRadius: "50%",
          borderTop: "2px solidrgb(221,221,221)",
          borderLeft: "2px solidrgb(221,221,221)",
          borderBottom: "2px solidrgb(137,137,137)",
          borderRight: "2px solidrgb(137,137,137)",
          backgroundColor: "white",
          filter: "brightness(0.9)",
          marginRight: `${size * 0.166}px`,
          backgroundImage: "url('/images/tags/power.png')",
        }}
      ></div>
      <span
        style={{
          fontSize: `${size * 0.666}px`,
          fontFamily: "ArialNarrow,Verdana",
          fontWeight: "normal",
        }}
      >
        THORGATE
      </span>
    </div>
  ),
  "d80c3aea-ce29-486b-a490-62f40850444d": ({ size }: { size: number }) => (
    <div
      style={{
        fontSize: `${size * 0.195}px`,
        width: `${size * 1.219}px`,
        fontFamily: "Prototype",
        lineHeight: 1.05,
        color: "white",
        padding: `${size * 0.06}px`,
        paddingTop: `${size * 0.12}px`,
        textAlign: "center",
        fontWeight: "normal",
        textShadow: `0 0 ${size * 0.024}px black`,
        background: "linear-gradient(-60deg,#208cdf 10%,#208cdf88,#208cdf 90%)",
        backgroundImage:
          "linear-gradient(-60deg,#208cdf 10%,#208cdf88,#208cdf 90%)",
      }}
    >
      UNITED NATIONS MARS INITIATIVE
    </div>
  ),
  "59e59119-9128-4509-a585-35e73508a0cc": ({ size }: { size: number }) => (
    <span
      style={{
        fontSize: `${size * 0.85}px`,
        color: "orangered",
        fontFamily: "TimesNewRoman",
        fontWeight: "normal",
        textShadow:
          "-1px 0 #333333,0 1px #333333,1px 0 #333333, 0px -1px #333333",
      }}
    >
      TERACTOR
    </span>
  ),
  "b178e9c6-5ad1-42c8-aef5-1c62a00b63ff": ({ size }: { size: number }) => (
    <span
      style={{
        fontSize: `${size * 0.3888}px`,
        color: "white",
        lineHeight: `${size * 0.55}px`,
        background: "#32004d",
        position: "relative",
        top: `-${size * 0.08}px`,
        paddingTop: `${size * 0.215}px`,
        paddingBottom: `${size * 0.215}px`,
        paddingLeft: `${size * 0.545}px`,
        paddingRight: `${size * 0.545}px`,
        borderRadius: "50%",
        fontWeight: "normal",
        border: `${size * 0.0555}px solid white`,
        fontFamily: "Prototype",
        boxShadow: `0px 0px ${size * 0.0555}px black`,
      }}
    >
      SATURN{" "}
      <span
        style={{
          fontSize: `${size * 0.555}px`,
          display: "inline-block",
        }}
      >
        ●
      </span>{" "}
      SYSTEMS
    </span>
  ),
  "e6279941-c902-4a68-88b9-2463113d81e5": ({ size }: { size: number }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
        }}
      >
        <span
          style={{
            color: "red",
            border: `${size * 0.133}px solid red`,
            borderRadius: "50%",
            padding: `${size * 0.1}px ${size * 0.166}px`,
            fontSize: `${size * 0.47}px`,
            lineHeight: 2.1428,
            marginRight: `${size * 0.2}px`,
          }}
        >
          㨐
        </span>
      </div>

      <div
        style={{
          display: "inline-block",
          fontSize: `${size * 0.435}px`,
          lineHeight: 1.15,
          verticalAlign: "middle",
          fontFamily: "Prototype",
          fontWeight: "normal",
        }}
      >
        Cheung&nbsp;Shing
        <br />
        <div style={{ marginLeft: "10px" }}> ■■MARS■■ </div>
      </div>
    </div>
  ),
  "31167f7b-4775-45da-a8a9-90be61e713f3": ({ size }: { size: number }) => (
    <div style={{ width: `${size * 5.51}px` }}>
      <div
        style={{
          fontSize: `${size * 0.65}px`,
          fontFamily: "Prototype",
          fontWeight: "normal",
          display: "inline-block",
          textDecoration: "underline",
          position: "relative",
          left: `${size * 1}px`,
          transform: "scale(1.5,1)",
        }}
      >
        POINT&nbsp;LUNA
      </div>
    </div>
  ),
  "b42fbf82-500e-4630-9b11-0f699b017269": ({ size }: { size: number }) => (
    <div
      style={{
        fontFamily: "Prototype",
        fontSize: `${size * 0.417}px`,
        lineHeight: 1.2,
      }}
    >
      <div style={{ letterSpacing: `${size * 0.098}px` }}>ROBINSON</div>
      <div style={{ letterSpacing: `${size * 0.049}px` }}>INDUSTRIES</div>
    </div>
  ),
  "fb2d2492-e9b2-4cdd-a31c-4722ad1cab65": ({ size }: { size: number }) => (
    <div
      style={{
        fontFamily: "Prototype",
        color: "rgb(2, 125, 195)",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(to right, rgb(2, 125, 195) 10%, white, white, white, white, white, white, white)",
        width: `${size * 2.5}px`,
        borderRadius: `${size * 0.175}px 0 0 ${size * 0.175}px`,
        border: "1px solid gray",
        padding: `${size * 0.07}px 0`,
      }}
    >
      <div
        style={{
          display: "inline-block",
          marginLeft: `${size * 0.438}px`,
          marginTop: `${size * 0.035}px`,
          lineHeight: 0.9,
          fontSize: `${size * 0.42}px`,
          textAlign: "center",
        }}
      >
        VALLEY TRUST
      </div>
    </div>
  ),
  "1a0844c3-1ee9-4487-a26d-272456887224": ({ size }: { size: number }) => (
    <div
      style={{
        fontFamily: "Prototype",
        fontSize: `${size * 0.666}px`,
        width: `${size * 3.85}px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "inline-block",
          transform: "scale(2,1)",
          position: "relative",
          left: `${size}px`,
        }}
      >
        <span style={{ color: "white", background: "orangered" }}>VIT</span>
        <span
          style={{ background: "linear-gradient(to right, orangered, white)" }}
        >
          O
        </span>
        <span style={{ background: "white" }}>R</span>
      </div>
    </div>
  ),
}

export default corporationLogs
