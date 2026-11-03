"""Lossless DDS decoding of supplied TNO assets; no generated artwork."""
from pathlib import Path
from PIL import Image
import hashlib

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'tno/TNO'
OUT = ROOT / 'ui/pipeline-assets'
ASSETS = {
    'radio-station': 'gfx/event_pictures/Antarctica/report_event_radio_electronics_station.dds',
    'button': 'gfx/interface/button_type_1.dds',
    'button-wide': 'gfx/interface/button_type_4.dds',
    'close': 'gfx/interface/closebutton_small.dds',
    'checkbox': 'gfx/interface/generic_checkbox3.dds',
    'progress-empty': 'gfx/interface/espionage/GFX_Espionage_GUI_BarResearch_Empty.dds',
    'progress-full': 'gfx/interface/espionage/GFX_Espionage_GUI_BarResearch_Full.dds',
    'radio-detection': 'gfx/interface/technologies/radio_detection.dds',
}
OUT.mkdir(exist_ok=True)
rows = ['# 数据管线原版素材来源', '',
        '按第二版 TNO 手册选择“情报接收终端”语义：无线电设备对应采集，阶段表对应处理，日志对应接收记录。',
        '以下均为用户提供的本地模组 DDS 解码，不是 AI 生图。保留原色、透明度和比例；无政治徽记替用。', '',
        '| PNG | 原件（tno/TNO 下） | 原尺寸 | SHA-256 |', '|---|---|---|---|']
for name, relative in ASSETS.items():
    path = SOURCE / relative
    image = Image.open(path).convert('RGBA')
    image.save(OUT / (name + '.png'))
    rows.append(f'| {name}.png | {relative} | {image.width}×{image.height} | {hashlib.sha256(path.read_bytes()).hexdigest()} |')
rows += ['', '按钮采用原按钮纹理和硬边轮廓；进度条只表示已进入的处理阶段，不伪装成剩余时间估算。',
         '复选框依据 interface/frontendgamesetupview.gfx 的 noOfFrames=2，按 28×23 分帧使用。',
         '英文标签/读数复用 Aldrich TNO；中文标题复用已有锐正黑子集，长日志使用系统等宽字以保证可读性。',
         '保留失败/恢复两种状态，原照片不加统一绿色滤镜。完整日志可切换，默认隐藏机器事件行并保留诊断文本。']
(OUT / 'SOURCES.md').write_text('\n'.join(rows), encoding='utf-8')
