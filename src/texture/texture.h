#pragma once

#ifndef TEXTURE_H
#define TEXTURE_H

#include <string>
#include <glad\glad.h>

using namespace std;

// =====================================loader
typedef struct _ImageData
{
	int count; // ʹ�ô���
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
	// ��������Ԫ
	static void active(unsigned int unit) {
		if (unit >= GL_TEXTURE0 && unit <= GL_TEXTURE31) {
			glActiveTexture(unit);
		} else if (unit >= 0 && unit <= 31) {
			glActiveTexture(GL_TEXTURE0 + unit);
		}
	}

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
	// format ���������磺 GL_RGB/GL_RGBA
	bool use(unsigned int format); // �Զ�����������Ҫ�Ķ༶��Զ����
	bool use(unsigned int format, int level); // �ֶ����ö༶��Զ����ļ���

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