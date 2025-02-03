# Base image supports Nvidia CUDA but does not require it and can also run demucs on the CPU
FROM nvidia/cuda:12.6.2-base-ubuntu22.04

# 设置环境变量
USER root
ENV TORCH_HOME=/data/models
ENV OMP_NUM_THREADS=1

# 安装系统依赖
RUN apt update && apt install -y --no-install-recommends \
    build-essential \
    ffmpeg \
    git \
    python3 \
    python3-dev \
    python3-pip \
    nodejs \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 克隆 Demucs 并安装依赖
RUN git clone --single-branch --branch main https://github.com/YOUUJUN/demucs-docker-source.git /lib/demucs \
    && cd /lib/demucs \
    && git checkout b9ab48cad45976ba42b2ff17b229c071f0df9390 \
    && python3 -m pip install -e . "torch<2" "torchaudio<2" "numpy<2" --no-cache-dir \
    && python3 -m demucs -d cpu test.mp3 \
    && rm -r separated

# 复制项目文件并安装 Node.js 依赖
RUN git clone --single-branch --branch master git@github.com:YOUUJUN/koa-vue-framework-simple.git /lib/project \
    && cd /lib/project \
    && npm install \
    && npm install -g pm2

WORKDIR /lib/project

# 设置数据卷
VOLUME /data/input
VOLUME /data/output
VOLUME /data/models

# 暴露端口
EXPOSE 3002

# 启动应用
CMD ["pm2-runtime", "ecosystem.config.js"]