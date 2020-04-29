#pragma once

#ifndef TEXTURE_H
#define TEXTURE_H

#include <string>
#include <glad\glad.h>

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
	// �����Ʒ�ʽ
	int wraps = GL_REPEAT;
	int wrapt = GL_REPEAT;
	float borderColor[4] = { 0.0f }; // ��Ե��ɫ�������ڻ�����GL_CLAMP_TO_BORDERʱ

	// �������
	int minFilter = GL_NEAREST;
	int magFilter = GL_NEAREST;

	void setFilename(const char* filename);

	Texture();
	Texture(const char* filename);

	// ���ز�ʹ����������
	bool use(); // �Զ�����������Ҫ�Ķ༶��Զ����
	bool use(int level); // �ֶ����ö༶��Զ����ļ���
	// ������
	void bind();

protected:
	// ����Ŀ��
	const int TARGET = GL_TEXTURE_2D;

	unsigned int ID = 0;
	string src = "";

	// ���ز���������
	ImageData* _use();
};

#endif