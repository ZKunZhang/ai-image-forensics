# AI 图片频域分析特征体系

> 目标：构建二分类特征向量（AI生成 vs 真实相机拍摄），采集 OpenAI/Gemini/Midjourney/SD 等生成图片 + 真实相机照片，训练分类器。

---

## 一、频谱能量特征（Spectral Energy）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 1 | `low_freq_ratio` | 低频区(0-10%)能量占总能量比 | AI倾向更均匀，真实照片低频占比更高 |
| 2 | `mid_freq_ratio` | 中频区(10-40%)能量占比 | SD/MJ中频有异常峰值 |
| 3 | `high_freq_ratio` | 高频区(40-100%)能量占比 | AI高频衰减更规律 |
| 4 | `spectral_slope` | 频谱衰减速率(log-log线性拟合斜率) | 真实照片遵循1/f规律，AI偏离 |
| 5 | `spectral_flatness` | 频谱平坦度(几何均值/算术均值) | AI频谱更平坦(均匀) |
| 6 | `spectral_entropy` | 频谱能量分布的熵 | AI熵值更集中 |
| 7 | `dc_component` | DC分量(平均亮度) | 辅助特征 |
| 8 | `ac_energy_total` | 总AC能量 | 辅助特征 |

## 二、频段精细分析（Sub-band Analysis）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 9 | `band_0_5_ratio` | 0-5%频段能量比 | 极低频差异 |
| 10 | `band_5_10_ratio` | 5-10%频段能量比 | |
| 11 | `band_10_20_ratio` | 10-20%频段能量比 | |
| 12 | `band_20_30_ratio` | 20-30%频段能量比 | |
| 13 | `band_30_50_ratio` | 30-50%频段能量比 | |
| 14 | `band_50_70_ratio` | 50-70%频段能量比 | |
| 15 | `band_70_100_ratio` | 70-100%频段能量比 | 极高频 |

## 三、径向频率分布（Radial Frequency）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 16 | `radial_energy_variance` | 同心圆环能量方差 | AI更均匀 |
| 17 | `radial_peak_count` | 径向方向异常峰值数量 | SynthID有特定峰值 |
| 18 | `radial_symmetry` | 频谱径向对称性 | AI更对称 |

## 四、方向频率分布（Angular/Orientation）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 19 | `angular_energy_variance` | 扇形区域能量方差 | 真实照片有方向偏好(纹理) |
| 20 | `dominant_orientation` | 主方向角度 | 辅助特征 |
| 21 | `orientation_strength` | 主方向强度 | 真实照片更强 |

## 五、相位特征（Phase Analysis）— SynthID关键

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 22 | `phase_consistency_r` | 红通道相位一致性 | SynthID相位高度一致 |
| 23 | `phase_consistency_g` | 绿通道相位一致性 | **SynthID绿通道最强** |
| 24 | `phase_consistency_b` | 蓝通道相位一致性 | |
| 25 | `phase_noise_std` | 相位噪声标准差 | AI相位噪声更小 |
| 26 | `cross_color_phase_corr` | RGB三通道相位互相关 | SynthID跨通道高度相关 |

## 六、LSB分析（Least Significant Bit）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 27 | `lsb0_bias_r` | 红通道LSB偏离0.5程度 | 水印嵌入改变LSB分布 |
| 28 | `lsb0_bias_g` | 绿通道LSB偏离0.5程度 | |
| 29 | `lsb0_bias_b` | 蓝通道LSB偏离0.5程度 | |
| 30 | `lsb1_bias` | 第2低位偏离程度 | |
| 31 | `lsb_correlation` | 相邻像素LSB相关性 | 水印打破自然相关性 |
| 32 | `lsb_chi_square` | LSB卡方检验统计量 | 水印导致非随机分布 |

## 七、像素级统计特征（Pixel Statistics）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 33 | `pixel_mean_r/g/b` | 各通道均值 | 辅助 |
| 34 | `pixel_std_r/g/b` | 各通道标准差 | 辅助 |
| 35 | `pixel_skew_r/g/b` | 各通道偏度 | AI分布更对称 |
| 36 | `pixel_kurt_r/g/b` | 各通道峰度 | AI峰度不同 |
| 37 | `rg_correlation` | R-G通道相关系数 | AI通道间相关性不同 |
| 38 | `rb_correlation` | R-B通道相关系数 | |
| 39 | `gb_correlation` | G-B通道相关系数 | |

## 八、邻域相关性（Spatial Correlation）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 40 | `horz_corr` | 水平相邻像素相关系数 | AI可能过度平滑 |
| 41 | `vert_corr` | 垂直相邻像素相关系数 | |
| 42 | `diag_corr` | 对角相邻像素相关系数 | |
| 43 | `corr_break_ratio_2` | 2位平面邻域相关断裂率 | 水印打破相关性 |
| 44 | `corr_break_ratio_4` | 4位平面邻域相关断裂率 | |

## 九、小波特征（Wavelet Analysis）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 45 | `wavelet_hh1_energy` | 第1层HH子带能量 | 高频细节 |
| 46 | `wavelet_hh2_energy` | 第2层HH子带能量 | |
| 47 | `wavelet_hh3_energy` | 第3层HH子带能量 | |
| 48 | `wavelet_lh_ratio` | LH/LL能量比 | 水平纹理 |
| 49 | `wavelet_hl_ratio` | HL/LL能量比 | 垂直纹理 |
| 50 | `wavelet_hh_ratio` | HH/LL能量比 | 对角纹理 |
| 51 | `wavelet_subband_kurt` | 各子带峰度 | AI峰度异常 |
| 52 | `wavelet_coeff_entropy` | 小波系数熵 | |

## 十、DCT特征（针对JPEG）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 53 | `dct_coef_mean` | DCT系数均值 | |
| 54 | `dct_coef_std` | DCT系数标准差 | |
| 55 | `dct_coef_kurt` | DCT系数峰度 | 双重压缩检测 |
| 56 | `dct_zero_ratio` | DCT零系数比例 | 压缩特征 |
| 57 | `dct_block_variance` | 8x8块间方差 | AI块间更均匀 |

## 十一、噪声残差特征（Noise Residual）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 58 | `noise_residual_std` | 去噪残差标准差 | AI噪声模式不同 |
| 59 | `noise_residual_skew` | 残差偏度 | |
| 60 | `noise_residual_kurt` | 残差峰度 | |
| 61 | `noise_residual_entropy` | 残差直方图熵 | |
| 62 | `prnu_strength` | PRNU(光响应非均匀性)强度 | 真实相机有PRNU，AI没有 |

## 十二、纹理特征（Texture）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 63 | `glcm_contrast` | GLCM对比度 | 纹理复杂度 |
| 64 | `glcm_homogeneity` | GLCM同质性 | AI可能过度同质 |
| 65 | `glcm_energy` | GLCM能量 | |
| 66 | `glcm_correlation` | GLCM相关性 | |
| 67 | `lbp_uniformity` | LBP均匀性 | 纹理模式 |
| 68 | `lbp_entropy` | LBP熵 | |

## 十三、边缘/梯度特征（Edge/Gradient）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 69 | `edge_density` | 边缘像素占比 | |
| 70 | `gradient_mag_mean` | 梯度幅值均值 | |
| 71 | `gradient_mag_std` | 梯度幅值标准差 | |
| 72 | `gradient_hist_entropy` | 梯度方向直方图熵 | AI方向分布更均匀 |

## 十四、中频周期性特征（Mid-freq Periodicity）— 水印专用

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 73 | `mid_freq_peak_count` | 中频区异常周期峰数量 | SynthID有特定载波 |
| 74 | `mid_freq_peak_strength` | 最强周期峰强度 | |
| 75 | `periodic_pattern_score` | 周期性模式评分 | 水印嵌入产生周期性 |

## 十五、SynthID 专用特征（需码本）

| # | 特征名 | 计算方法 | 预期区分能力 |
|---|--------|---------|-------------|
| 76 | `synthid_carrier_phase_1` | 载波(9,9)处相位值 | 需要已知码本 |
| 77 | `synthid_carrier_phase_2` | 载波(5,5)处相位值 | |
| 78 | `synthid_carrier_phase_3` | 载波(10,11)处相位值 | |
| 79 | `synthid_consensus_score` | 跨颜色相位共识评分 | >0.95极可能是SynthID |

---

## 数据采集计划

### 正样本（AI生成）— 每类至少500张

| 来源 | 模型 | 数量 | 分辨率 |
|------|------|------|--------|
| OpenAI API | DALL-E 3 / gpt-image-1 | 500 | 1024x1024 |
| Google API | Gemini Imagen 3 | 500 | 1024x1024 |
| Midjourney | MJ v6 | 500 | 1024x1024 |
| Stability AI | SDXL / SD3 | 500 | 1024x1024 |
| 本地部署 | Flux.1 dev | 500 | 1024x1024 |
| 本地部署 | ComfyUI + SD1.5 | 500 | 512x512 |

### 负样本（真实照片）— 至少1000张

| 来源 | 说明 | 数量 |
|------|------|------|
| RAISE dataset | 原始RAW转JPEG，无后期 | 500 |
| Dresden Image Database | 多相机多场景 | 300 |
| 自拍 | iPhone/小米/Canon | 200 |

### 数据预处理

1. 统一缩放到 512x512（特征提取用）或 1024x1024（SynthID检测用）
2. JPEG Q95 存储（保留质量）
3. 记录原始分辨率、格式、来源模型

---

## 特征提取流程

```
输入图片
  ├─ RGB分离
  │   ├─ 各通道FFT → 频谱能量特征(#1-18)
  │   ├─ 各通道相位 → 相位特征(#22-26)
  │   └─ 各通道LSB → LSB特征(#27-32)
  ├─ 灰度图
  │   ├─ 2D FFT → 径向/方向特征(#16-21)
  │   ├─ DCT → DCT特征(#53-57)
  │   ├─ 小波分解 → 小波特征(#45-52)
  │   └─ 去噪 → 噪声残差特征(#58-62)
  ├─ 像素统计
  │   ├─ 通道统计(#33-39)
  │   └─ 邻域相关(#40-44)
  ├─ 纹理
  │   ├─ GLCM(#63-66)
  │   └─ LBP(#67-68)
  ├─ 边缘
  │   └─ 梯度(#69-72)
  └─ 水印专用
      ├─ 中频周期性(#73-75)
      └─ SynthID相位(#76-79，需码本)
```

总计 **79 个特征** → 输入 XGBoost / RandomForest / 简单MLP 做二分类。

---

## 预期分类难度

| 来源 | 难度 | 原因 |
|------|------|------|
| OpenAI DALL-E 3 | ⭐⭐ | C2PA+频谱特征明显 |
| Google Gemini | ⭐⭐⭐ | SynthID码本可辅助 |
| Midjourney v6 | ⭐⭐ | 频谱+元数据特征 |
| SDXL / Flux | ⭐⭐⭐ | 需频谱精细分析 |
| SD1.5 + 后处理 | ⭐⭐⭐⭐ | 特征被弱化 |
| 高质量GAN | ⭐⭐⭐⭐⭐ | 最难，需深度特征 |
