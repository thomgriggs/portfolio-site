export const runtime = "edge";
export const alt = "Thom Griggs — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
import { ImageResponse } from "next/og";

export default function Image() {
	return new ImageResponse(
		(
			<div style={{ alignItems: "center", background: "#0b0b0c", color: "#eaeaea", display: "flex", fontSize: 56, height: "100%", justifyContent: "center", width: "100%" }}>
				<strong>Thom Griggs · Front-End Developer</strong>
			</div>
		),
		{ ...size }
	)
}
