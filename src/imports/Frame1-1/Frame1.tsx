import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import svgPaths from "./svg-xgpv5e2dj8";
import imgLogo from "./f00b995e56d83fe3818dbb20f3489f43c9842118.png";
import img1400 from "./c99f7f3f82a0bf28a3d5a01e39607bd48ab97bc7.png";
import imgHowItWorkPhotoroom11 from "./bd34e50c9e83b17704482ec7b4642d0cecf35adb.png";
import imgShareConnectivityPhotoroom11 from "./311951e40237148d45e9ff8e5da3ddabb5b2f118.png";
import imgBlackMatCoverPhotoPhotoroom1 from "./b70470e67d7a77c2b65e8724e75b75f2497ba316.png";
import imgWhiteGlociCoverPhotoPhotoroom1 from "./e436e6b89b49a3d046b520fae180b3d8e2ef5396.png";
import imgWoodenCoverPhotoPhotoroom1 from "./1d69cb9a0b8c7c77c84dc373238e43c2a1424558.png";
import imgRb21517992821 from "./660c27ca0ec3698840883ca2b74169ed156b880d.png";
import imgHighAngleShotBeautifulTropicalJungleWithExoticTallTrees1 from "./521e943a8963774f6b88641380052ae0b0cea457.png";

// ── Icon SVG components (self-contained, no absolute pixel placement) ──────────

function IconSaveMoney() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 45" fill="none">
      <path d={svgPaths.p268bc780} stroke="#FFB700" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p2cbeee00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function IconSavePlant() {
  return (
    <svg width="32" height="30" viewBox="0 0 54 51" fill="none">
      <path clipRule="evenodd" d={svgPaths.p3160f500} fill="white" fillRule="evenodd" />
    </svg>
  );
}

function IconCheckDouble() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <path d={svgPaths.p1d5e6200} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg width="10" height="14" viewBox="0 0 14 16.3452" fill="none">
      <path d={svgPaths.pfe4e400} fill="white" stroke="white" />
    </svg>
  );
}

// ── Feature card icons for "One Card" section ─────────────────────────────────

function IconNoApp() {
  return (
    <div className="size-[90px] relative flex items-center justify-center">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109 109">
        <g>
          <g filter="url(#f_noapp_d)">
            <circle cx="50.5" cy="50.5" fill="white" r="34.5" />
          </g>
          <path d={svgPaths.p15a59480} fill="url(#f_noapp_g)" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="109" id="f_noapp_d" width="109" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="eff" />
            <feOffset dx="4" dy="4" />
            <feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" result="s" />
            <feBlend in="SourceGraphic" in2="s" result="shape" />
          </filter>
          <linearGradient id="f_noapp_g" gradientUnits="userSpaceOnUse" x1="34.3014" x2="63.5224" y1="57.6515" y2="53.7749">
            <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconNFC() {
  return (
    <div className="size-[90px] relative flex items-center justify-center">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109 109">
        <g>
          <g filter="url(#f_nfc_d)">
            <circle cx="50.5" cy="50.5" fill="white" r="34.5" />
          </g>
          <path d={svgPaths.p3334100} fill="url(#f_nfc_g)" />
          <g clipPath="url(#f_nfc_clip)">
            <path clipRule="evenodd" d={svgPaths.p11b36400} fill="white" fillRule="evenodd" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="109" id="f_nfc_d" width="109" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="eff" />
            <feOffset dx="4" dy="4" /><feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" result="s" /><feBlend in="SourceGraphic" in2="s" result="shape" />
          </filter>
          <linearGradient id="f_nfc_g" gradientUnits="userSpaceOnUse" x1="62.9228" x2="54.5889" y1="33.7581" y2="64.7601">
            <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
          </linearGradient>
          <clipPath id="f_nfc_clip">
            <rect fill="white" height="13.1195" transform="translate(74.166 39.9956) rotate(123.243)" width="13.1874" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconAndroid() {
  return (
    <div className="size-[90px] relative flex items-center justify-center">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109 109">
        <g>
          <g filter="url(#f_and_d)"><circle cx="50.5" cy="50.5" fill="white" r="34.5" /></g>
          <g clipPath="url(#f_and_clip)">
            <path d={svgPaths.p25439f00} fill="url(#f_and_g)" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="109" id="f_and_d" width="109" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="eff" />
            <feOffset dx="4" dy="4" /><feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" result="s" /><feBlend in="SourceGraphic" in2="s" result="shape" />
          </filter>
          <linearGradient id="f_and_g" gradientUnits="userSpaceOnUse" x1="39.4612" x2="58.5153" y1="41.5286" y2="58.4904">
            <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
          </linearGradient>
          <clipPath id="f_and_clip">
            <rect fill="white" height="38.8869" transform="translate(55.174 21) rotate(48.6099)" width="38.8869" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconSecured() {
  return (
    <div className="size-[90px] relative flex items-center justify-center">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109 109">
        <g>
          <g filter="url(#f_sec_d)"><circle cx="50.5" cy="50.5" fill="white" r="34.5" /></g>
          <path d={svgPaths.p3de9c580} fill="url(#f_sec_g)" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="109" id="f_sec_d" width="109" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="eff" />
            <feOffset dx="4" dy="4" /><feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" result="s" /><feBlend in="SourceGraphic" in2="s" result="shape" />
          </filter>
          <linearGradient id="f_sec_g" gradientUnits="userSpaceOnUse" x1="39.6146" x2="59.6567" y1="56.2775" y2="54.1211">
            <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconSaveTrees() {
  return (
    <div className="size-[90px] relative flex items-center justify-center">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109 109">
        <g>
          <g filter="url(#f_tree_d)"><circle cx="50.5" cy="50.5" fill="white" r="34.5" /></g>
          <g transform="translate(28, 22) scale(1.0)">
            <svg width="52" height="52" viewBox="0 0 46 47" fill="none">
              <path d={svgPaths.p3b48ec00} fill="url(#f_tree_g0)" />
              <path d={svgPaths.p1ed53530} fill="url(#f_tree_g1)" />
              <path d={svgPaths.p30f089f0} fill="url(#f_tree_g2)" />
              <defs>
                <linearGradient id="f_tree_g0" gradientUnits="userSpaceOnUse" x1="5.5914" x2="35.0801" y1="38.3415" y2="30.9097">
                  <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
                </linearGradient>
                <linearGradient id="f_tree_g1" gradientUnits="userSpaceOnUse" x1="5.34939" x2="5.34939" y1="32.3355" y2="35.4433">
                  <stop stopColor="#0CFAF5" /><stop offset="1" stopColor="#DC00D3" />
                </linearGradient>
                <linearGradient id="f_tree_g2" gradientUnits="userSpaceOnUse" x1="22.3833" x2="40.0286" y1="15.9694" y2="13.5864">
                  <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
                </linearGradient>
              </defs>
            </svg>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="109" id="f_tree_d" width="109" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="eff" />
            <feOffset dx="4" dy="4" /><feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" result="s" /><feBlend in="SourceGraphic" in2="s" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function IconCustomThemes() {
  return (
    <div className="size-[90px] relative flex items-center justify-center">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109 109">
        <g>
          <g filter="url(#f_theme_d)"><circle cx="50.5" cy="50.5" fill="white" r="34.5" /></g>
          <g transform="translate(29, 27)">
            <svg width="50" height="50" viewBox="0 0 47 47" fill="none">
              <path d={svgPaths.p3bdef000} fill="url(#f_theme_g0)" />
              <path d={svgPaths.pa7c6800} fill="url(#f_theme_g1)" />
              <path d={svgPaths.p3f8a4880} fill="url(#f_theme_g2)" />
              <path d={svgPaths.p5454200} fill="url(#f_theme_g3)" />
              <path d={svgPaths.p10ab8d80} fill="url(#f_theme_g4)" />
              <defs>
                <linearGradient id="f_theme_g0" gradientUnits="userSpaceOnUse" x1="2.79606" x2="18.24" y1="15.1346" y2="13.2137"><stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" /></linearGradient>
                <linearGradient id="f_theme_g1" gradientUnits="userSpaceOnUse" x1="13.9497" x2="25.2882" y1="36.374" y2="34.9637"><stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" /></linearGradient>
                <linearGradient id="f_theme_g2" gradientUnits="userSpaceOnUse" x1="26.8499" x2="36.429" y1="21.2842" y2="20.0927"><stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" /></linearGradient>
                <linearGradient id="f_theme_g3" gradientUnits="userSpaceOnUse" x1="1.67581" x2="3.63085" y1="31.2887" y2="31.046"><stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" /></linearGradient>
                <linearGradient id="f_theme_g4" gradientUnits="userSpaceOnUse" x1="35.4571" x2="37.4112" y1="6.3348" y2="6.08866"><stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" /></linearGradient>
              </defs>
            </svg>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="109" id="f_theme_d" width="109" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="eff" />
            <feOffset dx="4" dy="4" /><feGaussianBlur stdDeviation="7.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" result="s" /><feBlend in="SourceGraphic" in2="s" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// ── Background decoration ─────────────────────────────────────────────────────

function BlueBlurr() {
  return (
    <div className="absolute h-[5558.188px] left-[-571px] top-[504px] w-[2480.809px] pointer-events-none" data-name="blue blurr">
      <div className="absolute inset-[-5.99%_-13.63%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3157.08 6224.27">
          <g id="blue blurr">
            <g filter="url(#filter0_f_1_394)" id="Ellipse 24">
              <ellipse cx="1613.04" cy="5565.14" fill="url(#paint0_linear_1_394)" rx="319.061" ry="1204.06" transform="rotate(-90.3349 1613.04 5565.14)" />
            </g>
            <g filter="url(#filter1_f_1_394)" id="Rectangle 25">
              <rect fill="url(#paint1_linear_1_394)" height="265" width="1612" x="847.137" y="583.041" />
            </g>
            <g filter="url(#filter2_f_1_394)" id="Ellipse 28">
              <path d={svgPaths.p3915ca00} fill="url(#paint2_linear_1_394)" />
            </g>
            <g filter="url(#filter3_f_1_394)" id="Ellipse 29" opacity="0.7">
              <ellipse cx="1544.04" cy="659.135" fill="url(#paint3_linear_1_394)" rx="319.061" ry="1204.06" transform="rotate(-90.3349 1544.04 659.135)" />
            </g>
            <g filter="url(#filter4_f_1_394)" id="Ellipse 2">
              <path d={svgPaths.p3915ca00} fill="url(#paint4_linear_1_394)" />
            </g>
            <g filter="url(#filter5_f_1_394)" id="Ellipse 25">
              <path d={svgPaths.pac9e980} fill="url(#paint5_linear_1_394)" />
            </g>
            <g filter="url(#filter6_f_1_394)" id="Ellipse 26">
              <path d={svgPaths.p300a8100} fill="url(#paint6_linear_1_394)" />
            </g>
            <g filter="url(#filter7_f_1_394)" id="Ellipse 27">
              <path d={svgPaths.pe732800} fill="url(#paint7_linear_1_394)" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1318.27" id="filter0_f_1_394" width="3088.08" x="69.0004" y="4906">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_394" stdDeviation="170" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="465" id="filter1_f_1_394" width="1812" x="747.137" y="483.041">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_394" stdDeviation="50" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1248.97" id="filter2_f_1_394" width="1242.57" x="1664.79" y="1297.68">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_394" stdDeviation="170" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="878.27" id="filter3_f_1_394" width="2748.12" x="169.978" y="220.0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_394" stdDeviation="170" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1248.97" id="filter4_f_1_394" width="1242.57" x="1080.84" y="1989.14">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_394" stdDeviation="170" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1248.97" id="filter5_f_1_394" width="1242.57" x="282.979" y="3052.14">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_394" stdDeviation="170" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1248.97" id="filter6_f_1_394" width="1242.57" x="1452.84" y="4052.14">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_394" stdDeviation="170" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1248.97" id="filter7_f_1_394" width="1242.57" x="282.979" y="4115.14">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_394" stdDeviation="170" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_394" x1="2203.04" x2="2153.22" y1="5565.14" y2="4187.11">
              <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_394" x1="847.137" x2="847.137" y1="583.041" y2="848.041">
              <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_394" x1="2372.95" x2="2323.12" y1="2137.59" y2="1759.36">
              <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_394" x1="2134.04" x2="2084.12" y1="659.135" y2="280.9">
              <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_1_394" x1="2372.95" x2="2323.12" y1="2137.59" y2="1759.36">
              <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_1_394" x1="1034.95" x2="985.125" y1="2839.59" y2="2461.36">
              <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint6_linear_1_394" x1="2418.95" x2="2369.12" y1="3896.59" y2="3518.36">
              <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint7_linear_1_394" x1="970.953" x2="921.125" y1="4847.59" y2="4469.36">
              <stop stopColor="#5AA4F4" /><stop offset="1" stopColor="#0E2D6E" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// ── Navigation ────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav className="flex items-center gap-10" data-name="Nav Bar">
      <div className="flex items-center gap-10">
        <Link to="/" className="font-['Inter',sans-serif] font-semibold text-[16px] text-[#5aa4f4] hover:opacity-80 transition-opacity uppercase">HOME</Link>
        <Link to="/shop" className="font-['Inter',sans-serif] font-semibold text-[16px] text-white hover:text-[#5AA4F4] transition-colors uppercase">SHOP</Link>
        <Link to="/blogs" className="font-['Inter',sans-serif] font-semibold text-[16px] text-white hover:text-[#5AA4F4] transition-colors uppercase">BLOGS</Link>
        <Link to="/about" className="font-['Inter',sans-serif] font-semibold text-[16px] text-white hover:text-[#5AA4F4] transition-colors uppercase">ABOUT US</Link>
      </div>

      {/* Cart icon */}
      <button aria-label="Cart" className="text-white hover:text-[#5aa4f4] transition-colors">
        <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>

      {/* Login */}
      <Link
        to="/login"
        className="font-['Inter',sans-serif] font-semibold text-[16px] border border-white text-white rounded-[50px] px-6 py-2 hover:bg-white hover:text-[#100425] transition-all duration-200 whitespace-nowrap uppercase"
      >
        LOGIN
      </Link>
    </nav>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────

import HeroAnimation from "../../app/components/HeroAnimation";

function HeroSection() {
  return (
    <section className="relative w-full z-10 mx-auto overflow-visible" data-name="Hero">
      <HeroAnimation />
    </section>
  );
}


import { motion } from 'framer-motion';

// ── How It Works ──────────────────────────────────────────────────────────────

function HowItWorksStep({ number, title, description, image, delay }: { number: string; title: string; description: string; image: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center text-center w-full max-w-[380px] group"
    >
      <div className="relative w-[260px] h-[220px] flex items-center justify-center mb-8">
        <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full scale-0 group-hover:scale-110 transition-transform duration-700" />
        <img alt={title} className="max-w-full max-h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" src={image} />
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex items-center gap-4">
          <div className="relative size-10 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5AA4F4] to-[#0E2D6E] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 border border-white/10 rounded-full" />
            <span className="absolute inset-0 flex items-center justify-center font-black text-lg text-[#5AA4F4] group-hover:text-white transition-colors">{number}</span>
          </div>
          <h3 className="font-['Inter',sans-serif] font-black text-2xl lg:text-3xl text-white tracking-tighter italic group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5AA4F4] group-hover:to-white transition-all duration-300">
            {title}
          </h3>
        </div>
        <div className="w-16 h-1 bg-[#5AA4F4]/30 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            transition={{ duration: 1, delay: delay + 0.3 }}
            className="w-full h-full bg-gradient-to-r from-[#5AA4F4] to-[#0E2D6E]"
          />
        </div>
        <p className="font-['Inter',sans-serif] text-sm lg:text-[15px] text-white/50 leading-relaxed max-w-[300px] mx-auto font-medium">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function HowItWorks() {
  return (
    <section className="w-full max-w-[1440px] z-10 py-32 px-6 overflow-hidden" data-name="How It Works">
      <div className="text-center mb-24">
        <motion.p 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-[#5AA4F4] font-black uppercase tracking-[0.4em] text-xs mb-4"
        >
          Process
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-['Inter',sans-serif] font-black text-[40px] lg:text-[64px] text-white tracking-[-0.04em] leading-[0.9]"
        >
          HOW IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">WORKS.</span>
        </motion.h2>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-center gap-20 lg:gap-12">
        <HowItWorksStep
          number="1"
          title="CHOOSE"
          description="Select your premium Tapinfi card from our executive collection or create a fully bespoke custom design."
          image={img1400}
          delay={0.1}
        />
        <HowItWorksStep
          number="2"
          title="ACTIVATE"
          description="Simply tap your card to your smartphone to initialize your secure digital identity link instantly."
          image={imgHowItWorkPhotoroom11}
          delay={0.3}
        />
        <HowItWorksStep
          number="3"
          title="CONNECT"
          description="Share your profile, contacts, and social media with a single tap. Network with zero friction."
          image={imgShareConnectivityPhotoroom11}
          delay={0.5}
        />
      </div>
    </section>
  );
}

// ── Our Products ──────────────────────────────────────────────────────────────

function ProductCard({ title, price, image, delay, comingSoon, linkTo }: { title: string; price: string; image: string; delay: string; comingSoon?: boolean; linkTo: string }) {
  return (
    <div
      data-sr-card
      data-delay={delay}
      className="relative w-full max-w-[355px] h-[455px] rounded-[25px] border-2 border-white bg-white/20 backdrop-blur-xl p-8 flex flex-col items-center transition-all hover:scale-[1.02]"
    >
      <div className="w-full text-left mb-4">
        <p className="font-['Inter:Regular',sans-serif] text-[20px] text-white uppercase">{title}</p>
      </div>
      <div className="flex-1 w-full flex items-center justify-center p-4">
        <img alt={title} className="max-w-full max-h-full object-contain pointer-events-none" src={image} />
      </div>
      <div className="w-full flex items-center justify-between mt-auto">
        <div className="text-white">
          <span className="font-['Inter:Regular',sans-serif] text-[20px]">INR </span>
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px]">{price}</span>
        </div>
        {comingSoon ? (
          <div className="bg-gray-500 rounded-full px-6 py-2 font-['Inter:Semi_Bold',sans-serif] text-white text-[14px] opacity-70 cursor-not-allowed">
            COMING SOON
          </div>
        ) : (
          <Link
            to={linkTo}
            className="bg-gradient-to-r from-[#5AA4F4] to-[#0E2D6E] rounded-full px-6 py-2 font-['Inter:Semi_Bold',sans-serif] text-white text-[14px] shadow-lg hover:shadow-[#5AA4F4]/50 transition-shadow relative z-20"
          >
            SHOP NOW
          </Link>
        )}
      </div>
      {!comingSoon && <Link to={linkTo} className="absolute inset-0 z-10" aria-label={`Shop ${title}`} />}
    </div>
  );
}

import { products as staticProducts } from '../../app/data/products';

function OurProducts() {
  return (
    <section className="w-full max-w-[1440px] z-10 py-20 px-6" data-name="Our Products">
      <p data-sr data-delay="0" className="font-['Inter:Bold',sans-serif] font-bold text-[32px] lg:text-[40px] text-white text-center mb-16">
        Our Products
      </p>
      <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center min-h-[455px]">
        {staticProducts.slice(0, 3).map((p, i) => {
          let toLink = `/product/${p.id}`;
          if (p.id === 'white-gloss') toLink = '/shop?material=PVC';
          if (p.id === 'matte-black') toLink = '/shop?material=Matt';
          return (
            <ProductCard 
              key={p.id}
              title={p.name} 
              price={p.price.toString()} 
              image={p.img} 
              delay={(i * 100).toString()} 
              comingSoon={p.id === 'wooden'}
              linkTo={toLink}
            />
          );
        })}
      </div>
    </section>
  );
}

// ── One Card – Many Functions ─────────────────────────────────────────────────

function FeatureItem({ icon, title, delay }: { icon: React.ReactNode; title: React.ReactNode; delay: string }) {
  return (
    <div data-sr data-delay={delay} className="flex flex-col items-center text-center w-[180px] md:w-[220px]">
      <div className="relative size-[90px] mb-6 flex items-center justify-center">
        {icon}
      </div>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] md:text-[20px] text-white leading-tight">
        {title}
      </p>
    </div>
  );
}

function OneCard() {
  return (
    <section className="w-full max-w-[1440px] z-10 py-20 px-6" data-name="One Card">
      <p data-sr data-delay="0" className="font-['Inter:Bold',sans-serif] font-bold text-[32px] lg:text-[40px] text-white text-center mb-16">
        One Card - Many Functions
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-12 gap-x-4 lg:gap-x-8 justify-items-center w-full max-w-[1200px] mx-auto">
        <FeatureItem title="No App Needed" icon={<IconNoApp />} delay="0" />
        <FeatureItem title="NFC Technology" icon={<IconNFC />} delay="100" />
        <FeatureItem title={<span>Android/IOS<br />Compatible</span>} icon={<IconAndroid />} delay="200" />
        <FeatureItem title={<span>Secured<br />By AWS</span>} icon={<IconSecured />} delay="300" />
        <FeatureItem title={<span>Save<br />Trees</span>} icon={<IconSaveTrees />} delay="400" />
        <FeatureItem title={<span>Custom<br />Themes</span>} icon={<IconCustomThemes />} delay="500" />
      </div>
    </section>
  );
}

// ── Profile Customization ─────────────────────────────────────────────────────

function ProfileCustomizationSection() {
  return (
    <section className="w-full max-w-[1440px] z-10 py-20 px-6" data-name="Profile Customization">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 justify-between">
        {/* Left Text */}
        <div className="flex flex-col gap-4 max-w-[380px] order-2 lg:order-1 text-center lg:text-left">
          <div className="bg-[#5aa4f4] h-[6px] w-[119px] mx-auto lg:mx-0" />
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[26px] lg:text-[32px] text-white leading-tight">
            <p>To Say Who You Are</p>
            <p>And What You Do</p>
          </div>
          <div className="font-['Inter:Bold',sans-serif] font-bold text-[26px] lg:text-[32px] text-white leading-tight">
            <p>Customize Your</p>
            <p>Profile</p>
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-white/80 leading-normal">
            To Share All Your Important Information, Social Links, Payment Links and Much More
          </p>
        </div>

        {/* Center Image */}
        <div className="order-1 lg:order-2 relative size-[280px] sm:size-[380px] lg:size-[480px] flex-shrink-0">
          <div className="rotate-180 size-full">
            <img alt="Tapinfi Card" className="w-full h-full object-contain pointer-events-none" src={imgRb21517992821} />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-[60%] h-[5px] blur-2xl bg-white/20" />
        </div>

        {/* Right Text */}
        <div className="order-3 flex flex-col gap-5 max-w-[300px] text-center lg:text-left">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[17px] text-white leading-normal">
            <p>Leave A Lasting First Impression,</p>
            <p>Stand Out From The Crowd And</p>
            <p>Become Unforgettable.</p>
          </div>
          <div className="flex flex-col items-start gap-4 text-left">
            <div className="flex items-start gap-3">
              <IconCheckDouble />
              <p className="font-['Inter:Regular',sans-serif] text-[13px] text-white/70 leading-relaxed">Empowering Entrepreneurs and businesses with all in one networking tool.</p>
            </div>
            <div className="flex items-start gap-3">
              <IconCheckDouble />
              <p className="font-['Inter:Regular',sans-serif] text-[13px] text-white/70 leading-relaxed">Ready for scale. Whether you are a start up or a fortune 500 company.</p>
            </div>
            <div className="flex items-start gap-3">
              <IconCheckDouble />
              <p className="font-['Inter:Regular',sans-serif] text-[13px] text-white/70 leading-relaxed">Stay Ahead, Stay Successful, Stay Connected</p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#5AA4F4] to-[#0E2D6E] rounded-full px-8 py-3.5 font-['Inter:Bold',sans-serif] font-bold text-[16px] text-white shadow-lg hover:scale-105 hover:shadow-[#5AA4F4]/40 transition-all active:scale-95 group"
            >
              GET STARTED
              <div className="transition-transform group-hover:translate-x-1">
                <IconChevronRight />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Calculator Section ────────────────────────────────────────────────────────

function CalculatorSection() {
  return (
    <section className="w-full max-w-[1440px] z-10 py-20 px-6" data-name="Calculator Section">
      <p data-sr data-delay="0" className="font-['Inter:Bold',sans-serif] font-bold text-[32px] lg:text-[40px] text-white text-center mb-16">
        Networking Made Eco-friendly
      </p>
      <div className="flex flex-col lg:flex-row gap-16 w-full items-center justify-center">
        {/* Left Controls */}
        <div className="w-full max-w-[540px] flex flex-col gap-10">
          <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[26px] lg:text-[32px] text-white leading-tight text-center lg:text-left">
            <p>Calculate Your Benefits</p>
            <p>With Tapinfi</p>
          </div>
          {/* Slider 1 */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-white">
              <span className="text-[15px]">No. of Employees in Company</span>
              <div className="bg-gradient-to-r from-[#5AA4F4] to-[#0E2D6E] px-4 py-1 rounded-[10px] font-bold text-sm">10</div>
            </div>
            <div className="relative h-[6px] bg-[#5aa4f4]/30 rounded-full">
              <div className="absolute top-0 left-0 h-full bg-[#5aa4f4] w-[30%] rounded-full" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[30%] size-[15px] bg-[#5aa4f4] rounded-full border-2 border-white" />
            </div>
          </div>
          {/* Slider 2 */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-white">
              <span className="text-[15px]">Printing Cost (per 500 cards)</span>
              <div className="bg-white text-black px-4 py-1 rounded-[10px] font-bold flex items-baseline gap-1 text-sm">
                <span>1000</span><span className="text-[10px]">INR</span>
              </div>
            </div>
            <div className="relative h-[6px] bg-[#5aa4f4]/30 rounded-full">
              <div className="absolute top-0 left-0 h-full bg-[#5aa4f4] w-[50%] rounded-full" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[50%] size-[15px] bg-[#5aa4f4] rounded-full border-2 border-white" />
            </div>
          </div>
          <div className="h-[1px] bg-white/20 w-full" />
          {/* Results */}
          <div className="flex justify-around items-center gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="size-[79px] bg-[#FFB700] rounded-full flex items-center justify-center">
                <IconSaveMoney />
              </div>
              <p className="font-semibold text-white text-[16px]">INR 9900/year</p>
              <p className="text-white/60 text-[12px]">You Save</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="size-[79px] bg-[#0A7204] rounded-full flex items-center justify-center">
                <IconSavePlant />
              </div>
              <p className="font-semibold text-white text-[16px]">0 Trees</p>
              <p className="text-white/60 text-[12px]">Saved</p>
            </div>
          </div>
        </div>
        {/* Right Image */}
        <div className="relative group w-full max-w-[502px] aspect-[502/305] rounded-[30px] overflow-hidden shadow-2xl">
          <img alt="Eco forest" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={imgHighAngleShotBeautifulTropicalJungleWithExoticTallTrees1} />
          <div className="absolute inset-x-0 bottom-8 flex justify-center">
            <img alt="Tapinfi" className="h-[40px] md:h-[60px] object-contain opacity-80" src={imgLogo} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function Group25() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = [
    {
      q: "What exactly is Tapinfi, and how does it work?",
      a: "Tapinfi is a smart NFC-enabled digital business card that lets you share your contact details, social media profiles, and business information with a single tap. Simply tap your Tapinfi card against any NFC-compatible smartphone and your digital profile opens instantly in their browser — no app required."
    },
    {
      q: "Is there a subscription fee or recurring cost?",
      a: "Tapinfi is a one-time purchase. You pay once for your physical card and get lifetime access to your digital profile. There are no hidden monthly fees. Optional premium plans with advanced analytics and custom branding are available if you choose to upgrade."
    },
    {
      q: "Can I update my profile information after purchasing?",
      a: "Absolutely! Your Tapinfi digital profile is fully editable at any time through our web dashboard. Change your contact number, update social links, add new product showcase pages — all updates are live instantly without reprinting your card."
    },
    {
      q: "Do I need to download any app to use this product?",
      a: "No! Simply tap your Tapinfi card against any modern smartphone (iOS or Android) and your digital profile opens instantly in the browser. No app installation, no Bluetooth pairing — just one seamless tap."
    },
    {
      q: "How long will it take to receive my products?",
      a: "We process and dispatch orders within 1–2 business days. Standard delivery across India takes 5–7 business days. You'll receive a tracking number via email as soon as your order ships."
    },
    {
      q: "What features does Tapinfi offer for user customization and interaction?",
      a: "Your Tapinfi profile is fully customizable. Add your name, designation, company, profile photo, and links to LinkedIn, Instagram, Twitter, WhatsApp, portfolio websites, and payment gateways. Multiple themes and color palettes let you match your personal brand perfectly."
    },
    {
      q: "Which phones are compatible? Will it work with all phones?",
      a: "Tapinfi works with all modern NFC-enabled smartphones — iPhones from iPhone 7 onwards (iOS 13+) and virtually all Android devices running Android 5.0 or later."
    },
  ];

  return (
    <section data-sr data-delay="0" className="w-full max-w-[1270px] z-10 py-20 px-6" data-name="FAQ">
      <p className="font-['Inter:Bold',sans-serif] font-bold text-[32px] lg:text-[40px] text-white leading-tight mb-3">
        Frequently Asked Questions
      </p>
      <p className="font-['Inter:Medium',sans-serif] font-medium text-[18px] lg:text-[24px] text-white/70 leading-normal mb-12">
        Do you need some help with something?
      </p>
      <div className="flex flex-col w-full">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-white/10">
            <button
              className="flex items-center justify-between w-full py-6 text-left group"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              aria-expanded={openIdx === i}
            >
              <p className="font-['Inter:Regular',sans-serif] text-[17px] lg:text-[22px] text-white group-hover:text-[#5AA4F4] transition-colors pr-4">
                {faq.q}
              </p>
              <span className={`flex-shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-[300px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
              <p className="font-['Inter:Regular',sans-serif] text-[14px] lg:text-[16px] text-white/60 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative w-full max-w-[1440px] z-10 py-16 px-6 lg:px-20 border-t border-white/20 overflow-hidden" data-name="Footer">
      {/* Footer Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#5AA4F4]/15 blur-[120px] pointer-events-none z-[-1]" />
      
      <div className="relative flex flex-col md:flex-row justify-between gap-10 mb-12">
        <div className="flex flex-col gap-4">
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-white/50 uppercase tracking-wider">Customer Care</p>
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white">+91 0000 0000</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-white/50 uppercase tracking-wider text-left md:text-center">Quick Links</p>
          <div className="flex flex-wrap gap-6 text-[15px]">
            <Link to="/shop" className="text-white hover:text-[#5AA4F4] transition-colors">Shop</Link>
            <Link to="/analytics" className="text-white hover:text-[#5AA4F4] transition-colors">Analytics</Link>
            <Link to="/orders" className="text-white hover:text-[#5AA4F4] transition-colors">Your Orders</Link>
            <Link to="/plan" className="text-white hover:text-[#5AA4F4] transition-colors">My Plan</Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-left md:text-right">
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-white/50 uppercase tracking-wider">Contact Information</p>
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white">tapinfi@gmail.com</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
        <p className="text-white/40 text-[14px]">Tapinfi 2025. All Rights Reserved</p>
        <div className="flex flex-wrap justify-center gap-6 text-[14px] text-white/60">
          <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}

// ── Main Website Container ────────────────────────────────────────────────────

function Website() {
  return (
    <div className="relative bg-[#020617] w-full min-h-screen overflow-x-clip flex flex-col items-center" data-name="Website">
      {/* Background radial glow decorations to recreate the missing glow effect properly */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[300px] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full bg-[#5AA4F4]/15 blur-[160px]" />
        <div className="absolute top-[2000px] left-[5%] w-[800px] h-[800px] rounded-full bg-[#5AA4F4]/10 blur-[180px]" />
        <div className="absolute top-[3500px] right-[5%] w-[800px] h-[800px] rounded-full bg-[#5AA4F4]/10 blur-[180px]" />
      </div>

      {/* Content */}
      <HeroSection />
      <HowItWorks />
      <OurProducts />
      <OneCard />
      <ProfileCustomizationSection />
      <CalculatorSection />
      <Group25 />
      <Footer />
    </div>
  );
}

// ── Frame (page root with scroll reveal) ─────────────────────────────────────

export default function Frame() {
  useEffect(() => {
    const srEls = Array.from(document.querySelectorAll('[data-sr]'));
    const srObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = (entry.target as HTMLElement).dataset.delay ?? '0';
            setTimeout(() => entry.target.classList.add('is-visible'), Number(delay));
            srObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    srEls.forEach((el) => srObserver.observe(el));

    const cardEls = Array.from(document.querySelectorAll('[data-sr-card]'));
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = (entry.target as HTMLElement).dataset.delay ?? '0';
            setTimeout(() => entry.target.classList.add('is-visible'), Number(delay));
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    cardEls.forEach((el) => cardObserver.observe(el));

    return () => {
      srObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative size-full">
      <Website />
    </div>
  );
}