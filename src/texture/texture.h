#pragma once

#ifndef TEXTURE_H
#define TEXTURE_H

#include <string>

using namespace std;

// =====================================loader
typedef struct _ImageData
{
	int width;
	int height;
	int nrChannels;
	unsigned char* data;
} ImageData;

// ����ͼƬ���ݡ�����Ѵ���ֱ�ӷ��ػ�������
ImageData* loadImage(const char* filename);
// ���ݼ���ɾ��ͼƬ��������
bool deleteImageCache(const char* filename);
// ���ͼƬ��������
void clearImageCahe();

class Texture {
public:
	void setFilename(const char* filename);

	Texture();
	Texture(const char* filename);

private:
	unsigned int ID = 0;
	string src = "";
};

#endif