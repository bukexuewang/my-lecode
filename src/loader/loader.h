#pragma once

#ifndef LOADER_H
#define LOADER_H

#include <map>
#include <vector>
#include <assimp/postprocess.h>

using namespace std;

static constexpr int CACHE_MAX_SIZE = 5000; // ��󻺴���
// =========================================ͼƬ
struct ImageData
{
	int count; // ʹ�ô���
	int width;
	int height;
	unsigned int format;
	unsigned char* data;
};
// ����ͼƬ���ݡ�����Ѵ���ֱ�ӷ��ػ�������
ImageData* loadImage(const char* filename);
// ���ݼ���ɾ��ͼƬ��������
bool deleteImageCache(const char* filename);
// ���ͼƬ��������
void clearImageCahe();

// =========================================ģ��
class Mesh;

struct ModelData {
	vector<Mesh*>* data;
	int count; // ʹ�ô���
};

// ����ģ��
ModelData* loadModel(const string path, unsigned int pFlags = aiProcess_Triangulate);
// �Ƴ�ģ�ͻ���
bool deleteModelCache(const string path);
// ��ջ���
void clearModelCache();

#endif
