#pragma once

#ifndef TEXTURE_H
#define TEXTURE_H

#include <string>
#include <glad/glad.h>

using namespace std;

// =====================================loader
typedef struct _ImageData
{
	int count; // ʹ�ô���
	int width;
	int height;
	unsigned int format;
	unsigned char* data;
} ImageData;

// ����ͼƬ���ݡ�����Ѵ���ֱ�ӷ��ػ�������
ImageData* loadImage(const char* filename);
// ���ݼ���ɾ��ͼƬ��������
bool deleteImageCache(const char* filename);
// ���ͼƬ��������
void clearImageCahe();

enum class TEXTURE_TYPE {
	NORMAL, // ��ͨ����
	DIFFUSE, // ��������ͼ
	SPECULAR // �������ͼ
};

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

	// ����Ԫ
	unsigned int unit = 0;
	TEXTURE_TYPE type = TEXTURE_TYPE::NORMAL; //  ��������

	// �����Ʒ�ʽ
	int wraps = GL_REPEAT;
	int wrapt = GL_REPEAT;
	float borderColor[4] = { 0.0f }; // ��Ե��ɫ�������ڻ�����GL_CLAMP_TO_BORDERʱ

	// �������
	int minFilter = GL_LINEAR_MIPMAP_LINEAR;
	int magFilter = GL_LINEAR;

	Texture* setFilename(const char* filename);

	Texture(const char* filename = "");
	~Texture();

	// ���ز�ʹ����������
	bool use(); // �Զ����ö༶��Զ����ļ���
	bool use(int level); //  �ֶ����ö༶��Զ����ļ���

	// ������
	void bind();
	// ��¡��ǰ����
	Texture* clone();

protected:
	// ����Ŀ��
	const int TARGET = GL_TEXTURE_2D;

	unsigned int ID = 0;
	string src = "";

	// ���ز���������
	ImageData* _use();
};

#endif