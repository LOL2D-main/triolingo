"use client";

import React from "react";
import type { ChestTier } from "@/constants";

type ChestArtworkProps = {
  tier: ChestTier;
  /** Goc mo nap ruong (0 = dong, 1 = he mo phat sang, 2 = bung nap) */
  openStage?: "closed" | "cracked" | "opened";
  className?: string;
};

/**
 * Do hoa Ruong Go (Anh 4), Ruong Hiem (Anh 3), va Ruong Huyen Thoai (Anh 1)
 * Do chi tiet cao, tach rieng phan Than Duoi (Base) va Nap Tren (Lid)
 * de khi mo ruong, nap ruong he mo va anh sang loe ra tu ben trong mieng ruong.
 */
export const ChestArtwork = ({
  tier,
  openStage = "closed",
  className = "w-64 h-64",
}: ChestArtworkProps) => {
  const lidTransform =
    openStage === "cracked"
      ? "translate(0, -18) rotate(-5, 160, 145)"
      : openStage === "opened"
      ? "translate(0, -42) rotate(-14, 160, 145)"
      : "translate(0, 0)";

  if (tier === "wood") {
    return (
      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <radialGradient id="woodMouthGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="55%" stopColor="#F8FAFC" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0" />
          </radialGradient>
          <filter id="woodBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Bong do de ruong */}
        <rect
          x="38"
          y="188"
          width="244"
          height="64"
          rx="22"
          fill="#3B4850"
        />

        {/* THAN DUOI RUONG GO */}
        <g id="wood-base">
          {/* Chan de trai & phai */}
          <rect x="48" y="182" width="44" height="54" rx="14" fill="#E3AB7A" />
          <rect x="228" y="182" width="44" height="54" rx="14" fill="#E3AB7A" />

          {/* Go tam duoi */}
          <rect x="86" y="168" width="148" height="60" fill="#B56E06" />
          <rect x="86" y="196" width="148" height="10" fill="#995A03" />
          <rect x="86" y="218" width="148" height="10" fill="#854D02" />

          {/* Bong duoi dai ngang */}
          <rect x="48" y="182" width="44" height="10" fill="#C98E5B" />
          <rect x="228" y="182" width="44" height="10" fill="#C98E5B" />
        </g>

        {/* KHE MIENG RUONG PHAT SANG TRANG DIU KHI HE MO */}
        {openStage !== "closed" && (
          <g>
            <ellipse
              cx="160"
              cy="152"
              rx="115"
              ry={openStage === "opened" ? "44" : "24"}
              fill="url(#woodMouthGlow)"
              filter="url(#woodBlur)"
            />
            <rect
              x="58"
              y="136"
              width="204"
              height={openStage === "opened" ? "32" : "18"}
              rx="9"
              fill="#FFFFFF"
            />
          </g>
        )}

        {/* NAP TREN RUONG GO (Tach roi de nang len khi he mo) */}
        <g
          id="wood-lid"
          transform={lidTransform}
          style={{ transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        >
          {/* Vom go trung tam */}
          <rect x="84" y="56" width="152" height="110" rx="12" fill="#C87D0A" />
          {/* Ranh van go ngang */}
          <rect x="84" y="88" width="152" height="9" fill="#9E5E03" />
          <rect x="84" y="122" width="152" height="9" fill="#9E5E03" />
          <rect x="84" y="129" width="152" height="35" fill="#B36B05" />

          {/* Tru dai go ben trai */}
          <path
            d="M48 82 C48 67 60 56 74 56 H80 C88 56 94 62 94 70 V168 H48 V82 Z"
            fill="#F4C396"
          />
          <rect x="52" y="42" width="40" height="48" rx="14" fill="#FAD5B3" />
          <rect x="52" y="86" width="40" height="62" rx="6" fill="#F0BD8F" />
          {/* Vet sang bong ben trai */}
          <rect x="46" y="102" width="9" height="44" rx="4.5" fill="#FCE3CA" />

          {/* Tru dai go ben phai */}
          <path
            d="M226 70 C226 62 232 56 240 56 H246 C260 56 272 67 272 82 V168 H226 V70 Z"
            fill="#F4C396"
          />
          <rect x="228" y="42" width="40" height="48" rx="14" fill="#FAD5B3" />
          <rect x="228" y="86" width="40" height="62" rx="6" fill="#F0BD8F" />
          <rect x="264" y="102" width="8" height="44" rx="4" fill="#FCE3CA" />

          {/* Thanh dai ngang giua ruong + Vien sang */}
          <rect x="92" y="142" width="136" height="12" fill="#FFF3E5" />
          <path
            d="M44 148 H276 V174 C276 184 268 192 258 192 H62 C52 192 44 184 44 174 V148 Z"
            fill="#F2BF91"
          />

          {/* Khoa tron o giua */}
          <circle cx="160" cy="168" r="32" fill="#FFF3E5" />
          <circle cx="160" cy="168" r="28" fill="#F2BF91" />
          <circle cx="160" cy="168" r="18" fill="#FFF4E8" />
        </g>
      </svg>
    );
  }

  if (tier === "rare") {
    return (
      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <radialGradient id="rareMouthGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#0284C7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
          <filter id="rareBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* Bong do xanh dam duoi de ruong */}
        <rect
          x="36"
          y="188"
          width="248"
          height="64"
          rx="22"
          fill="#0B53C6"
        />

        {/* THAN DUOI RUONG HIEM */}
        <g id="rare-base">
          {/* Go xanh duoi */}
          <rect x="76" y="168" width="168" height="60" rx="8" fill="#0E56DC" />
          <rect x="76" y="198" width="168" height="9" fill="#0942B2" />
          <rect x="76" y="218" width="168" height="10" fill="#073493" />

          {/* Chan vang ben trai (nghieng nhe theo Anh 3) */}
          <path
            d="M44 182 H88 L98 234 C99 239 95 243 90 243 H58 C50 243 44 237 44 229 V182 Z"
            fill="#F5A300"
          />
          <rect x="44" y="180" width="46" height="9" fill="#D9481E" />

          {/* Chan vang ben phai */}
          <path
            d="M232 182 H276 V229 C276 237 270 243 262 243 H230 C225 243 221 239 222 234 L232 182 Z"
            fill="#F5A300"
          />
          <rect x="230" y="180" width="46" height="9" fill="#D9481E" />
        </g>

        {/* KHE MIENG RUONG PHAT SANG XANH DUONG RUC RO KHI HE MO */}
        {openStage !== "closed" && (
          <g>
            <ellipse
              cx="160"
              cy="150"
              rx="132"
              ry={openStage === "opened" ? "56" : "32"}
              fill="url(#rareMouthGlow)"
              filter="url(#rareBlur)"
            />
            <rect
              x="50"
              y="134"
              width="220"
              height={openStage === "opened" ? "36" : "20"}
              rx="10"
              fill="#E0F2FE"
            />
          </g>
        )}

        {/* NAP TREN RUONG HIEM */}
        <g
          id="rare-lid"
          transform={lidTransform}
          style={{ transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        >
          {/* Vom xanh sapphire trung tam */}
          <path
            d="M82 54 Q160 72 238 54 V156 H82 V54 Z"
            fill="#1464F6"
          />
          {/* Ranh ngang xanh dam */}
          <rect x="82" y="88" width="156" height="9" fill="#0B47BF" />
          <rect x="82" y="120" width="156" height="9" fill="#0B47BF" />
          <rect x="82" y="129" width="156" height="27" fill="#0D50D2" />

          {/* Dai vang kim ben trai */}
          <path
            d="M58 44 H96 L80 152 H34 L44 74 C45 64 52 58 58 58 V44 Z"
            fill="#FFD000"
          />
          <rect x="56" y="42" width="40" height="36" rx="10" fill="#FFE042" />
          {/* Highlight sang ben trai */}
          <path d="M38 118 L44 76 H52 L46 118 H38 Z" fill="#FFF085" />

          {/* Dai vang kim ben phai */}
          <path
            d="M224 44 H262 V58 C268 58 275 64 276 74 L286 152 H240 L224 44 Z"
            fill="#FFD000"
          />
          <rect x="224" y="42" width="40" height="36" rx="10" fill="#FFE042" />

          {/* Dai ngang vang kim giua ruong */}
          <rect x="80" y="142" width="160" height="12" fill="#FFE552" />
          <path
            d="M32 146 H288 L282 176 C280 185 272 190 262 190 H58 C48 190 40 185 38 176 L32 146 Z"
            fill="#FFB100"
          />

          {/* Khoen khoa trai tim / khien vang o giua */}
          <path
            d="M126 146 C126 132 146 126 160 136 C174 126 194 132 194 146 C202 158 192 198 160 202 C128 198 118 158 126 146 Z"
            fill="#FFD000"
          />
          <path
            d="M132 150 C132 138 148 134 160 142 C172 134 188 138 188 150 C194 160 186 192 160 196 C134 192 126 160 132 150 Z"
            fill="#F59E0B"
          />
          {/* Tam khoa trang o giua */}
          <path
            d="M140 156 C140 149 151 147 160 153 C169 147 180 149 180 156 C183 166 177 185 160 188 C143 185 137 166 140 156 Z"
            fill="#FFFFFF"
          />
        </g>
      </svg>
    );
  }

  // TIER === "legendary" (MEGA CHEST - ANH 1)
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="megaMouthGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="35%" stopColor="#FFF59D" stopOpacity="1" />
          <stop offset="70%" stopColor="#FFD700" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FF8F00" stopOpacity="0" />
        </radialGradient>
        <filter id="megaBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* Bong do nau vang duoi de Ruong Huyen Thoai */}
      <path
        d="M38 172 H282 L292 232 C294 242 286 250 274 250 H46 C34 250 26 242 28 232 L38 172 Z"
        fill="#CC7A00"
      />

      {/* THAN DUOI RUONG HUYEN THOAI */}
      <g id="legendary-base">
        {/* Khung vang chan de */}
        <path
          d="M50 176 H270 L278 228 C279 236 273 242 264 242 H224 L208 228 H112 L96 242 H56 C47 242 41 236 42 228 L50 176 Z"
          fill="#FFCC00"
        />

        {/* Tam do trung tam phia duoi */}
        <rect x="86" y="176" width="148" height="36" rx="8" fill="#F04826" />
        <rect x="86" y="176" width="148" height="12" fill="#D43516" />

        {/* Vien cam nau duoi belt */}
        <rect x="46" y="174" width="40" height="10" fill="#D9821E" />
        <rect x="234" y="174" width="40" height="10" fill="#D9821E" />
      </g>

      {/* KHE MIENG RUONG PHAT SANG VANG HOANG KIM CHOI LOA KHI HE MO */}
      {openStage !== "closed" && (
        <g>
          <ellipse
            cx="160"
            cy="148"
            rx="145"
            ry={openStage === "opened" ? "68" : "38"}
            fill="url(#megaMouthGlow)"
            filter="url(#megaBlur)"
          />
          <rect
            x="44"
            y="130"
            width="232"
            height={openStage === "opened" ? "42" : "24"}
            rx="12"
            fill="#FFFDE7"
          />
        </g>
      )}

      {/* NAP TREN RUONG HUYEN THOAI (Anh 1) */}
      <g
        id="legendary-lid"
        transform={lidTransform}
        style={{ transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        {/* Than do cam bo cong */}
        <path
          d="M56 54 H264 C282 54 294 74 290 126 L284 156 H36 L30 126 C26 74 38 54 56 54 Z"
          fill="#F4512C"
        />
        {/* Cac duong ranh ngang do dam */}
        <rect x="42" y="92" width="236" height="8" fill="#D63616" />
        <rect x="42" y="122" width="236" height="8" fill="#D63616" />
        <rect x="42" y="130" width="236" height="24" fill="#E03E1D" />

        {/* Vom bo vang ben ngoai cung (Trai & Phai) */}
        <path
          d="M66 50 H48 C30 50 18 82 22 132 L30 156 H58 C46 116 50 76 66 50 Z"
          fill="#FFF066"
        />
        <path
          d="M254 50 H272 C290 50 302 82 298 132 L290 156 H262 C274 116 270 76 254 50 Z"
          fill="#FFF066"
        />

        {/* Vet sang trang bong loang tren vom vang ben trai (Y het Anh 1) */}
        <ellipse
          cx="39"
          cy="104"
          rx="9"
          ry="34"
          transform="rotate(6 39 104)"
          fill="#FFFFFF"
        />

        {/* 2 Dai Vang Cheo Chu V tu dinh xuong khoa giua (Dac trung Ruong Mega Anh 1) */}
        <path
          d="M110 52 H138 C134 86 112 126 88 152 H56 C82 122 104 86 110 52 Z"
          fill="#FFE85C"
        />
        <path
          d="M210 52 H182 C186 86 208 126 232 152 H264 C238 122 216 86 210 52 Z"
          fill="#FFE85C"
        />

        {/* Vien trang giua nap ruong */}
        <rect x="92" y="142" width="136" height="12" fill="#FFF9D2" />

        {/* Dai Vang Ngang Giua Ruong */}
        <path
          d="M26 130 H64 L96 150 H224 L256 130 H294 L284 168 C281 176 274 180 264 180 H56 C46 180 39 176 36 168 L26 130 Z"
          fill="#FFCC00"
        />

        {/* O Khoa Vuong Mien / Trai Tim Vang Hoang Kim O Giua */}
        <path
          d="M124 142 C124 128 145 122 160 132 C175 122 196 128 196 142 C204 156 194 190 160 194 C126 190 116 156 124 142 Z"
          fill="#FFE033"
        />
        <path
          d="M130 146 C130 135 147 130 160 138 C173 130 190 135 190 146 C196 158 188 184 160 188 C132 184 124 158 130 146 Z"
          fill="#E5A800"
        />
        {/* Bieu tuong canh trang phat sang o tam khoa (Y het Anh 1) */}
        <path
          d="M145 154 C145 148 153 147 160 152 C167 147 175 148 175 154 C184 154 187 162 178 167 C173 175 167 179 160 180 C153 179 147 175 142 167 C133 162 136 154 145 154 Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
};

/**
 * Icon ruong nho ben phai thanh tien do Nhiem vu hang ngay (Giong het Anh 5)
 */
export const QuestBarChestIcon = ({
  tier,
  className = "w-12 h-12",
}: {
  tier: ChestTier;
  className?: string;
}) => {
  const palette =
    tier === "wood"
      ? {
          trim: "#F2B680",
          trimShadow: "#D69358",
          body: "#B86B28",
          bodyDark: "#965216",
          lock: "#FCE3C8",
          keyhole: "#965216",
        }
      : tier === "rare"
      ? {
          trim: "#DCE6F2",
          trimShadow: "#B6C8DEC",
          body: "#3B82F6",
          bodyDark: "#1D4ED8",
          lock: "#F8FAFC",
          keyhole: "#1E40AF",
        }
      : {
          trim: "#FFE14D",
          trimShadow: "#EAB308",
          body: "#CA8A04",
          bodyDark: "#A16207",
          lock: "#FEF08A",
          keyhole: "#854D0E",
        };

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Khung ngoai */}
      <rect x="6" y="10" width="52" height="46" rx="6" fill={palette.trim} />
      {/* O go/kim loai tren */}
      <rect x="16" y="12" width="32" height="16" rx="2" fill={palette.body} />
      <rect x="16" y="20" width="32" height="4" fill={palette.bodyDark} />
      {/* O go/kim loai duoi */}
      <rect x="16" y="36" width="32" height="16" rx="2" fill={palette.body} />
      <rect x="16" y="44" width="32" height="4" fill={palette.bodyDark} />
      {/* Dai ngang giua */}
      <rect x="6" y="27" width="52" height="10" fill={palette.trim} />
      {/* O khoa trung tam */}
      <rect x="24" y="22" width="16" height="18" rx="4" fill={palette.lock} />
      <circle cx="32" cy="29" r="2.5" fill={palette.keyhole} />
      <rect x="30.5" y="30" width="3" height="5" rx="1" fill={palette.keyhole} />
    </svg>
  );
};

/**
 * Hinh minh hoa Nui Da Quy Xanh Lam no tung tu san (Chuan y het Anh 2: +125 da quy)
 */
export const GemRewardPileGraphic = ({
  className = "w-72 h-64",
}: {
  className?: string;
}) => {
  // Ham render 1 vien da quy da giac xanh lam co canh sang va diem sang trang
  const renderGem = (
    cx: number,
    cy: number,
    scale = 1,
    rotate = 0,
    key?: string | number
  ) => (
    <g
      key={key}
      transform={`translate(${cx}, ${cy}) rotate(${rotate}) scale(${scale})`}
    >
      {/* Than da quy da giac */}
      <polygon
        points="0,-24 22,-12 24,12 4,24 -20,16 -24,-8"
        fill="#1CB0F6"
      />
      {/* Mat sang phia tren */}
      <polygon points="0,-24 22,-12 6,2 -14,-4 -24,-8" fill="#38BDF8" />
      {/* Mat toi phia duoi */}
      <polygon points="22,-12 24,12 4,24 6,2" fill="#0284C7" />
      {/* Vet sang trang phan chieu */}
      <polygon points="-14,-8 -4,-14 0,-6 -10,-1" fill="#FFFFFF" />
    </g>
  );

  const pileGems = [
    // Tang dinh
    { x: 148, y: 52, s: 0.95, r: -10 },
    { x: 178, y: 56, s: 0.92, r: 14 },
    { x: 164, y: 74, s: 1.0, r: 5 },
    { x: 192, y: 80, s: 0.95, r: 22 },
    // Tang giua tren
    { x: 142, y: 96, s: 1.0, r: -15 },
    { x: 172, y: 102, s: 1.05, r: 8 },
    { x: 204, y: 106, s: 0.98, r: -12 },
    // Tang giua
    { x: 118, y: 122, s: 1.02, r: -18 },
    { x: 150, y: 126, s: 1.08, r: 12 },
    { x: 184, y: 128, s: 1.05, r: -6 },
    { x: 218, y: 126, s: 1.0, r: 18 },
    // Tang day rong
    { x: 94, y: 150, s: 1.02, r: -22 },
    { x: 126, y: 152, s: 1.08, r: 6 },
    { x: 162, y: 154, s: 1.12, r: -8 },
    { x: 198, y: 152, s: 1.08, r: 14 },
    { x: 232, y: 148, s: 1.0, r: -10 },
    // Tang sat vet nut
    { x: 74, y: 174, s: 0.96, r: -15 },
    { x: 108, y: 174, s: 1.05, r: 10 },
    { x: 144, y: 178, s: 1.1, r: -5 },
    { x: 180, y: 176, s: 1.08, r: 12 },
    { x: 216, y: 174, s: 1.04, r: -14 },
    { x: 248, y: 170, s: 0.95, r: 20 },
  ];

  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Vet nut san goc canh mau xam ben duoi (Y het Anh 2) */}
      <polygon
        points="22,176 58,154 78,162 246,154 268,148 292,162 278,174 302,188 262,194 268,208 242,194 206,214 198,196 126,212 118,192 64,202 48,194"
        fill="#A3ACB5"
      />
      <polygon
        points="22,176 58,154 74,186 48,194"
        fill="#8D96A0"
      />
      <polygon
        points="252,152 292,162 278,174 302,188 256,192"
        fill="#B6BFC8"
      />

      {/* Nui da quy xanh lam */}
      {pileGems.map((g, idx) => renderGem(g.x, g.y, g.s, g.r, idx))}

      {/* Chep mep duoi de tao hieu ung da quy troi len tu vet nut */}
      <polygon
        points="54,196 82,186 118,192 126,212 156,194 198,196 206,214 236,192 268,208 262,190"
        fill="#9CA3AF"
      />

      {/* 2 vien da quy vang ra phia truoc (Trai & Phai y het Anh 2) */}
      {renderGem(52, 226, 0.95, -14, "loose-left")}
      {renderGem(274, 210, 0.95, 16, "loose-right")}
    </svg>
  );
};

